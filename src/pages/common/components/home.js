import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/styles";

let styles = {
    root: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
        width: '80% !important',
        padding: '35px',
        float: 'right',
        marginRight: '2%',
        textAlign: 'justify',
        textIndent: '50px'
    },
    title:{
        textAlign: 'center'
    }
};

class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <Typography className={classes.title} variant="h4" component="h1">
                        Hello dear User!
                    </Typography>
                    <br />
                    <Typography variant="p" component="p">
                            This is a demo application built using ReactJS made by me, Erick Munekata, 
                        to accomplish an assignment sent by LeoVegas to test my JavaScript skills.
                    </Typography>
                    <br/>
                    <Typography variant="p" component="p">
                            Basically, this app consists in searching movies from The Movie DB's back-end using
                        REST API integration when the user types a movie title, or part of it, in the searchtext field and clicks
                        in the search icon. The integration will process the request and then return a list of movies related with the 
                        keywords sent.
                    </Typography>
                    <br/>
                    <Typography variant="p" component="p">
                            There are two features implemented: <strong>add/remove</strong> a movie to a <strong>favorite</strong> or <strong>watch later list</strong>.
                            Both of them are POST requests that will be sent using The Movie DB API to add/remove each movie clicked, according with the icons, to a favorite or 
                            watch later list in the The Movie DB user's account. To feedback the user, modals will appear to communicate an add and remove operation.
                    </Typography>
                    <br/>
                    <Typography variant="p" component="p">
                            When you access the search page, The Movie DB API will request your login and password to authorize this app to access the back-end and make operations with it data.
                    </Typography>
                </Paper>                
            </div>
        )
    }
}

export default withStyles(styles)(Home);
