import React, {Component} from 'react';
import '../../App.css';
import Menu from '../common/components/menu';
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import MakeRequests from '../../requests/MakeRequests';
import Requests_CTS from '../../requests/Requests_CTS';

class SearchPage extends Component{

    constructor(){
        super();
        this.state = ({
            data: "",
            session_id: this.getRequestToken()
        })
    }

    getRequestToken = () => {
        let parameters = {
          api_key: Requests_CTS.API_key,          
        };
    
        MakeRequests.get(parameters, Requests_CTS.searchAPI.getRequestToken, (res) => {
          if(!res.error && res.success){
              console.log('creating session...');
              console.log(res);
              this.createSession(res.request_token);
          }
          else
              console.log(res.message);
        }) 
    }

    createSession = (token) => {
        let parameters = {
            api_key: Requests_CTS.API_key
        };
        let bodyValues = {
            request_token: token
        }

        MakeRequests.post(parameters, bodyValues, Requests_CTS.searchAPI.createSession, res => {
            console.log('resposta: ' + res);
        })
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
                <SearchResults data={this.state.data} />
            </div>
        );
    }
}

export default SearchPage