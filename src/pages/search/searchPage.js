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
            request_token: this.authenticateUser()            
        })
    }

    authenticateUser() {
        let token;
        theMovieDb.authentication.generateToken(
            (res) => {
                let result = JSON.parse(res);
                if(result.success){
                    token = result.request_token;
                    console.log('token: ' + token);
                    theMovieDb.authentication.askPermissions({"token": token});
                    this.setState({request_token: token});
                }   
            }, 
            (rej) => {console.log(rej)}
        );
    }

    getResults(results){
        this.setState({
            data: results
        })
    }

    render(){
        return(            
            <div className="App">                            
                <h1>LeoMovies Assignment</h1>
                <Menu></Menu>
                <SearchBar callback={this.getResults.bind(this)} />
                <SearchResults data={this.state.data} request_token={this.state.request_token} />
            </div>
        );
    }
}

export default SearchPage