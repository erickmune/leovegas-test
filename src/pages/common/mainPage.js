import React, {Component} from 'react';
import '../../App.css';
import Menu from './components/menu';

class MainPage extends Component{

    render(){
        return(
            <div className="App">                            
                <h1>LeoMovies Assignment</h1>
                <Menu></Menu>
            </div>
        )
    }
}

export default MainPage