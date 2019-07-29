import React, {Component} from 'react';
import '../../App.css';
import Menu from '../common/components/menu';
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import theMovieDb from '../../lib/themoviedb';

class SearchPage extends Component{

    constructor(){
        super();
        this.state = ({
            data: "",
            session_id: "",
            request_token: "",
            generateRequestToken: this.authenticateUser()            
        })
    }

    authenticateUser() {
        let token;    
        theMovieDb.authentication.generateToken((res) => {
            let result = JSON.parse(res);
            if(result.success){
                token = result.request_token;
                console.log('token: ' + token);
                theMovieDb.authentication.askPermissions({"token": token});
                this.setState({request_token: token});
            }   
        }, 
        (rej) => {console.log(rej)});
    }

    updateResults(results){
        this.setState({
            data: results
        })
    }

    updateSessionId(id){
        this.setState({
            session_id: id
        })
    }

    render(){
        return(            
            <div className="App">                            
                <h1>LeoMovies Assignment</h1>
                <Menu></Menu>
                <SearchBar callback={this.updateResults.bind(this)} />
                <SearchResults callback={this.updateSessionId.bind(this)}
                 data={this.state.data} 
                 request_token={this.state.request_token}
                 session_id={this.state.session_id} />
            </div>
        );
    }
}

export default SearchPage