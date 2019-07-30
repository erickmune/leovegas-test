import React, { Component } from 'react'
import WatchLaterOutLined from "@material-ui/icons/WatchLaterOutlined";
import WatchLater from "@material-ui/icons/WatchLater";

export default class watchLaterButton extends Component {

    state = ({
        watchLater: false
    })

    watchLater = () => {
        this.setState({
            watchLater: !this.state.watchLater
        })
    }

    render() {
        if(this.state.watchLater){
            return (                                   
                <WatchLater onClick={this.watchLater}/>
            )
        }
        else{
            return (
                <WatchLaterOutLined onClick={this.watchLater}/>                
            )
        }        
    }
}
