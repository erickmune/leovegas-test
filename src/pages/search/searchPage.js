import React, {Component} from 'react';
import '../../App.css';
import Menu from '../common/components/menu';
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';

class SearchPage extends Component{

    render(){
        return(
            <div className="App">                            
                <h1>LeoMovies Assignment</h1>
                <Menu></Menu>
                <SearchBar />
                <SearchResults />
            </div>
            
        );
    }
}

export default SearchPage