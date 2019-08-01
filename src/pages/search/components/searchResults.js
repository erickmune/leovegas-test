import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theMovieDb from '../../../lib/themoviedb';
import FavoriteButton from './favoriteButton';
import WatchLaterButton from './watchLaterButton';

const posterBaseURL = 'https://image.tmdb.org/t/p/w200';

const styles = {
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

    favoriteIt(movieObj, token){                      
        if(!this.state.session_id){
            theMovieDb.authentication.generateSession({'request_token': token}, 
                (res) => {
                    const result = JSON.parse(res);
                    if(result.success){    
                        this.setState({session_id: result.session_id});
                        this.updatePageSession(this.state.session_id);
                        theMovieDb.account.getInformation({'session_id': this.state.session_id}, (res) => {
                            this.setState({user_id: JSON.parse(res).id});
                            this.commitFavoriteMovie(movieObj);                                                          
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
                this.commitFavoriteMovie(movieObj);                                
            },
            (rej) => {
                console.log(rej);
            })
        }
    }

    commitFavoriteMovie(movieObj){                
        theMovieDb.account.getFavoritesMovies({'id': this.state.user_id, 'session_id': this.state.session_id},
            (res) => {
                this.setState({favorite_movies: res.results});                    
                const results = JSON.parse(res).results;                    
                const isFavoriteMovie = results.filter(movie => 
                    movie.id === movieObj.id
                );
                theMovieDb.account.addFavorite({
                    'id': this.state.user_id, 
                    'session_id': this.state.session_id,
                    'media_type': 'movie',
                    'media_id': movieObj.id, 
                    'favorite': isFavoriteMovie.length === 0},
                    (res) => {
                        toast.success('"' + movieObj.title + '" is now a favorite movie', 
                            {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,                                                        
                            }
                        )                        
                    },
                    (rej) => {
                        toast.error('"' + movieObj.title + '" is no more a favorite movie', 
                            {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,                            
                            }
                        );                        
                    }
                );      

            },
            (rej) => {
                console.log(rej);
            }
        );        
    }

    watchLater(movieObj, token){
        if(!this.state.session_id){
            theMovieDb.authentication.generateSession({'request_token': token}, 
                (res) => {
                    const result = JSON.parse(res);
                    if(result.success){    
                        this.setState({session_id: result.session_id});
                        this.updatePageSession(this.state.session_id);
                        theMovieDb.account.getInformation({'session_id': this.state.session_id}, (res) => {
                            this.setState({user_id: JSON.parse(res).id});
                            this.commitWatchMovie(movieObj);                                                          
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
                this.commitWatchMovie(movieObj);                                
            },
            (rej) => {
                console.log(rej);
            })
        }
    }

    commitWatchMovie(movieObj){
        theMovieDb.account.getMovieWatchlist({'id': this.state.user_id, 'session_id': this.state.session_id},
            (res) => {
                this.setState({watch_movies: res.results});                    
                const results = JSON.parse(res).results;                    
                const isToBeWatched = results.filter(movie => 
                    movie.id === movieObj.id
                );                
                theMovieDb.account.addToWatchlist({
                    'id': this.state.user_id, 
                    'session_id': this.state.session_id,
                    'media_type': 'movie',
                    'media_id': movieObj.id, 
                    'watchlist': isToBeWatched.length === 0},
                    (res) => {
                        toast.success('"' + movieObj.title + '" was added to a watchlist', 
                            {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,                                                        
                            }
                        )                            
                    },
                    (rej) => {
                        toast.error('"' + movieObj.title + '" was removed from watchlist', 
                            {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,                            
                            }
                        );                          
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
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>            
                            <TableCell>Poster</TableCell>                
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
                                        <TableCell><img alt={result.title} srcSet={posterBaseURL + result.poster_path}/></TableCell>                                      
                                        <TableCell>{result.title}</TableCell>
                                        <TableCell>{result.popularity}</TableCell>
                                        <TableCell>{result.overview}</TableCell>
                                        <TableCell onClick={() => { this.favoriteIt({'id': result.id, 'title': result.title}, requestToken)} }><FavoriteButton/></TableCell>
                                        <TableCell onClick={() => { this.watchLater({'id': result.id, 'title': result.title}, requestToken)} }><WatchLaterButton/></TableCell>
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