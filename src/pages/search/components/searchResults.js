import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theMovieDb from '../../../lib/themoviedb';
import FavoriteButton from './favoriteButton';
import WatchLaterButton from './watchLaterButton';

let styles = {
    root: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
        width: '80% !important',
        padding: '0 10px 0 10px',
        float: 'right',
        marginRight: '2%'
    },
    table: {
        textAlign: 'center',
        marginRight: '70px'
    }
};

class SearchResults extends Component{

    constructor(){
        super();
        this.state = ({
            session_id: '',
            user_id: '',
            favorite_movies: '',
            watch_movies: ''
        })
    }

    updatePageSession(id){
        this.props.callback(id);
    }

    favoriteIt(id, token){                      
        if(!this.state.session_id){
            theMovieDb.authentication.generateSession({'request_token': token}, 
                (res) => {
                    let result = JSON.parse(res);
                    if(result.success){    
                        this.setState({session_id: result.session_id});
                        this.updatePageSession(this.state.session_id);
                        theMovieDb.account.getInformation({'session_id': this.state.session_id}, (res) => {
                            this.setState({user_id: JSON.parse(res).id});
                            this.commitFavoriteMovie(id);                                                          
                        },
                        (rej) => {
                            console.log(rej);    
                        })
                    }
                },
                (rej) => {console.log(rej)}
            );
        } else{
            theMovieDb.account.getInformation({'session_id': this.state.session_id}, (res) => {
                this.setState({user_id: JSON.parse(res).id});
                this.commitFavoriteMovie(id);                                
            },
            (rej) => {
                console.log(rej);
            })
        }
    }

    commitFavoriteMovie(id){                
        theMovieDb.account.getFavoritesMovies({'id': this.state.user_id, 'session_id': this.state.session_id},
            (res) => {
                this.setState({favorite_movies: res.results});                    
                let results = JSON.parse(res).results;                    
                let isFavoriteMovie = results.filter(movie => 
                    movie.id === id
                );
                theMovieDb.account.addFavorite({
                    'id': this.state.user_id, 
                    'session_id': this.state.session_id,
                    'media_type': 'movie',
                    'media_id': id, 
                    'favorite': isFavoriteMovie.length === 0},
                    (res) => {                                    
                        console.log('the movie id ' + id + ' is now a favorite movie')
                    },
                    (rej) => {
                        console.log('the movie id ' + id + ' is no more a favorite movie')
                    }
                );      

            },
            (rej) => {
                console.log(rej);
            }
        );        
    }

    watchLater(id, token){
        if(!this.state.session_id){
            theMovieDb.authentication.generateSession({'request_token': token}, 
                (res) => {
                    let result = JSON.parse(res);
                    if(result.success){    
                        this.setState({session_id: result.session_id});
                        this.updatePageSession(this.state.session_id);
                        theMovieDb.account.getInformation({'session_id': this.state.session_id}, (res) => {
                            this.setState({user_id: JSON.parse(res).id});
                            this.commitWatchMovie(id);                                                          
                        },
                        (rej) => {
                            console.log(rej);    
                        })
                    }
                },
                (rej) => {console.log(rej)}
            );
        } else{
            theMovieDb.account.getInformation({'session_id': this.state.session_id}, (res) => {
                this.setState({user_id: JSON.parse(res).id});
                this.commitWatchMovie(id);                                
            },
            (rej) => {
                console.log(rej);
            })
        }
    }

    commitWatchMovie(id){
        theMovieDb.account.getMovieWatchlist({'id': this.state.user_id, 'session_id': this.state.session_id},
            (res) => {
                this.setState({watch_movies: res.results});                    
                let results = JSON.parse(res).results;                    
                let isToBeWatched = results.filter(movie => 
                    movie.id === id
                );                
                theMovieDb.account.addToWatchlist({
                    'id': this.state.user_id, 
                    'session_id': this.state.session_id,
                    'media_type': 'movie',
                    'media_id': id, 
                    'watchlist': isToBeWatched.length === 0},
                    (res) => {                                    
                        console.log('the movie id ' + id + ' was added to a watchlist')
                    },
                    (rej) => {
                        console.log('the movie id ' + id + ' was removed from watchlist')
                    }
                );      

            },
            (rej) => {
                console.log(rej);
            }
        );        
    }

    render(){
        let {classes} = this.props;
        let data = this.props.data;                
        let requestToken = this.props.request_token;
        let length = data.length;
        return (            
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>                            
                            <TableCell>Title</TableCell>
                            <TableCell>Popularity</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Favorite</TableCell>
                            <TableCell>Add to Watchlist</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            length?
                                data.map(
                                    (result, i) =>
                                    <TableRow key={i}>                                        
                                        <TableCell>{result.title}</TableCell>
                                        <TableCell>{result.popularity}</TableCell>
                                        <TableCell>{result.overview}</TableCell>
                                        <TableCell onClick={() => { this.favoriteIt(result.id, requestToken)} }><FavoriteButton/></TableCell>
                                        <TableCell onClick={() => { this.watchLater(result.id, requestToken)} }><WatchLaterButton/></TableCell>
                                    </TableRow>
                                )
                                :
                                <TableRow>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default withStyles(styles)(SearchResults);