import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StarRate from "@material-ui/icons/StarRate";
import StarBorderOutlined from "@material-ui/icons/StarBorderOutlined";
import TvSharp from "@material-ui/icons/TvSharp";

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
        textAlign: "center",
        marginRight: '70px'
    }
};

class SearchResults extends Component{

    favoriteIt = () => {

    }

    render(){
        let {classes} = this.props;
        let data = this.props.data;
        console.log(data);
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
                                        <TableCell><StarBorderOutlined onClick={() => <StarRate /> }/> </TableCell>
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