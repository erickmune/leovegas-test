import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom/esm/react-router-dom';

let styles = {
    menuBar:{
        position: 'fixed',
        width: '15%'
    }
};

class Menu extends Component{

    render(){

        const {classes} = this.props;

        return (
            <div>
                <List className={classes.menuBar}>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                    <ListItem button component={Link} to='/search'>
                        <ListItemIcon><SearchIcon/></ListItemIcon>
                        <ListItemText primary='Search' />
                    </ListItem>                    
                </List>
            </div>
        )
    };
}

export default withStyles(styles)(Menu);