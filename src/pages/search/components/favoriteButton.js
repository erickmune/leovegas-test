import React, { Component } from 'react'
import StarBorderOutlined from "@material-ui/icons/StarBorderOutlined";
import StarRate from "@material-ui/icons/StarRate";

export default class favoriteButton extends Component {

    state = ({
        favorite: false
    })

    favOrunfav = () => {
        this.setState({
            favorite: !this.state.favorite
        })
    }

    render() {
        if(this.state.favorite){
            return (                                   
                <StarRate onClick={this.favOrunfav}/>
            )
        }
        else{
            return (
                <StarBorderOutlined onClick={this.favOrunfav}/>                
            )
        }        
    }
}
