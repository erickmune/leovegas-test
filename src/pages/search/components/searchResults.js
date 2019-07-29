import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StarBorderOutlined from "@material-ui/icons/StarBorderOutlined";
import TvSharp from "@material-ui/icons/TvSharp";
import theMovieDb from '../../../lib/themoviedb';

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
            favorite_movies: null
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
                        console.log(result.session_id);  
                        this.updatePageSession(this.state.session_id);                                      
                        theMovieDb.account.getInformation({'session_id': this.state.session_id}, (res) => {                                                
                            let infoRes = JSON.parse(res);
                            this.setState({user_id: infoRes.id});                            
                            console.log(infoRes.id);
                            theMovieDb.account.addFavorite({
                                'id': this.state.user_id, 
                                'session_id': this.state.session_id,
                                'media_type': 'movie',
                                'media_id': id, 
                                'favorite': true},
                                (res) => {
                                    console.log(res);
                                    console.log('the movie id ' + id + ' is now a favorite movie')
                                    this.getFavoritesMovies();                                    
                                },
                                (rej) => {console.log(rej)}
                            );            
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
                let infoRes = JSON.parse(res);
                this.setState({user_id: infoRes.id});                            
                console.log(infoRes.id);
                theMovieDb.account.addFavorite({
                    'id': this.state.user_id, 
                    'session_id': this.state.session_id,
                    'media_type': 'movie',
                    'media_id': id, 
                    'favorite': true},
                    (res) => {
                        console.log(res);
                        console.log('the movie id ' + id + ' is now a favorite movie')
                        this.getFavoritesMovies();                                    
                    },
                    (rej) => {console.log(rej)}
                );            
            },
            (rej) => {
                console.log(rej);    
            })
        }
    }

    getFavoritesMovies(){
        theMovieDb.account.getFavoritesMovies({'id': this.state.user_id, 'session_id': this.state.session_id},
            (res) => {
                this.setState({favorite_movies: res.results});
                console.log('Favorite movies:');
                console.log(JSON.parse(res));
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
                            <TableCell>Id</TableCell>
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
                                        <TableCell>{result.id}</TableCell>
                                        <TableCell>{result.title}</TableCell>
                                        <TableCell>{result.popularity}</TableCell>
                                        <TableCell>{result.overview}</TableCell>
                                        <TableCell>
                                            <StarBorderOutlined onClick={() => {
                                                this.favoriteIt(result.id, requestToken);                                                 
                                            } }/> 
                                        </TableCell>
                                        <TableCell><TvSharp /></TableCell>
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