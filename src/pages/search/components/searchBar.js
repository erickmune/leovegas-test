import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import theMovieDb from '../../../lib/themoviedb';
import PropTypes from 'prop-types';

let styles = {
    container: {
        width: '80%',
        maxWidth: 'sm md',
        float: 'right',
        marginLeft: '-50%'
    },
    textField: {
        width: '70% !important'
    },
    dense: {
        marginTop: 19
    }
};

class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {searchBarValue: ''};

        this.handleChange = this.handleChange.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
    }

    getContent(searchResults){
        this.props.callback(searchResults);
    }

    handleChange(event){
        this.setState({searchBarValue: event.target.value});
    }

    searchMovies(){
        theMovieDb.search.getMovie({'query': encodeURIComponent(this.state.searchBarValue)}, (res) => {
            const requestResults = [];
            JSON.parse(res).results.map(result => requestResults.push(result));
            console.log(requestResults);
            this.getContent(requestResults);
        }, (res) => { console.log(res.message) })
    }

    render(){

        const {classes} = this.props;

        return(
            <>
                <CssBaseline />
                <Container className={classes.container}>
                    <TextField
                        id='standard-search'
                        label='Movie Title Here...'
                        type='search'
                        className={classes.textField}
                        margin='normal'
                        value={this.state.searchBarValue}
                        onChange={this.handleChange}
                    />
                    <IconButton onClick={() => this.searchMovies()} aria-label='Search for a Universe!'>
                        <SearchIcon/>
                    </IconButton>
                </Container>
            </>            
        )
    }
}

SearchBar.protoTypes = {
    callback: PropTypes.func
}

export default withStyles(styles)(SearchBar)

    

