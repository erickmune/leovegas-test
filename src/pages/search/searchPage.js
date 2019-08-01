import React, {Component} from 'react';
import Menu from '../common/components/menu';
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import theMovieDb from '../../lib/themoviedb';
import { withStyles } from "@material-ui/styles";

let styles = {
    App:{
        textAlign: 'center'
    }
};

class SearchPage extends Component{

    constructor(){
        super();
        this.state = ({
            data: '',
            session_id: '',
            request_token: '',
            generateRequestToken: this.authenticateUser()            
        })
    }

    authenticateUser() {
        let token;    
        theMovieDb.authentication.generateToken((res) => {
            let result = JSON.parse(res);
            if(result.success){
                token = result.request_token;                
                theMovieDb.authentication.askPermissions({'token': token, 'redirect_to': ''});
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
        const {classes} = this.props;

        return(            
            <div className={classes.App}>                            
                <h1>LeoMovies Assignment</h1>
                <Menu/>
                <SearchBar callback={this.updateResults.bind(this)} />
                <SearchResults callback={this.updateSessionId.bind(this)}
                 data={this.state.data} 
                 request_token={this.state.request_token}
                 session_id={this.state.session_id} />
            </div>
        );
    }
}

export default withStyles(styles)(SearchPage);