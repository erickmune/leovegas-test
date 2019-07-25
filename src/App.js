import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import {Switch} from "react-router";
import MainPage from './pages/common/mainPage';
import SearchPage from './pages/search/searchPage';

let styles = {};

class App extends Component{
  
  render(){
    return (      
        <Router>
          <Switch style={{minHeight: window.innerHeight}}>
            <Route exact path="/" component={MainPage} />
            <Route path="/search" component={SearchPage}/>
          </Switch>
        </Router>
    );
  }
}



export default withStyles(styles)(App);
