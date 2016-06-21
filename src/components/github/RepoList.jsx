import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RepoComponent from './Repo.jsx'

class RepoList extends Component {
    render(){
        return (
            <div>
                <ul className="list-group">
                    {this
                        .props
                        .userRepos
                        .map(repo => {
                            return <RepoComponent repo={repo} key={repo.id} {...this.props}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}


export default RepoList