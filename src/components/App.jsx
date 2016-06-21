import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProfileComponent from './github/Profile.jsx';
import SearchComponent from './github/Search.jsx';

class App extends Component {

    constructor(){
        super();
        this.state = {
            username:'dwilbank68',
            userData: [],
            userRepos: [],
            perPage: 5
        }
    }

    getUserData(){
        $.ajax({
            url:'https://api.github.com/users/'
                + this.state.username
                + '?client_id='
                + this.props.clientId
                + '&client_secret='
                + this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({  userData: data });
            },
            error: (xhr, status, err) => {
                this.setState({ username: null });
                alert(err);
            }
        })
    }

    getUserRepos(){
        $.ajax({
            url:'https://api.github.com/users/'
                + this.state.username
                + '/repos?per_page='
                + this.state.perPage
                + '&client_id='
                + this.props.clientId
                + '&client_secret='
                + this.props.clientSecret
                + '&sort=created',
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({  userRepos: data });
            },
            error: (xhr, status, err) => {
                this.setState({ username: null });
                alert(err);
            }
        })
    }

    handleFormSubmit(username){
        this.setState({
            username: username
        }, () => {
            this.getUserData();
            this.getUserRepos();
        })
    }

    componentDidMount(){
        this.getUserData();
        this.getUserRepos();
    }

    render(){
        return (
            <div>
                < SearchComponent onFormSubmit = {this.handleFormSubmit.bind(this)}/>
                <ProfileComponent {...this.state}/>
            </div>
        )
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
}

App.defaultProps = {
    clientId: 'use your own number',
    clientSecret: 'use your own number'
}

export default App