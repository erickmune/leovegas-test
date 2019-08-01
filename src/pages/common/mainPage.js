import React, {Component} from 'react';
import Menu from './components/menu';
import Home from './components/home';
import { withStyles } from '@material-ui/styles';

let styles = {
    App:{
        textAlign: 'center'
    },
    menuBar:{
        position: 'fixed',
        width: '15%'
    }    
};

class MainPage extends Component{    

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.App}>                            
                <h1>LeoMovies Assignment</h1>
                <Menu/>
                <Home/>
            </div>
        )
    }
}

export default withStyles(styles)(MainPage);