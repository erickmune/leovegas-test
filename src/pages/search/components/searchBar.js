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
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
    }

    getContent(values){
        this.props.callback(values);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    searchMovies(){
        theMovieDb.search.getMovie({"query": encodeURIComponent(this.state.value)}, (res) => {
            let requestResults = [];
            JSON.parse(res).results.map(result => requestResults.push(result));
            this.getContent(requestResults);
        }, (res) => { console.log(res.message) })
    }

    render(){

        let {classes} = this.props;

        return(
            <>
                <CssBaseline />
                <Container className={classes.container}>
                    <TextField
                        id="standard-search"
                        label="Movie Title Here..."
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        value={this.state.value}
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

    

