import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {MdDashboard} from "react-icons/md";
import {DiGoogleAnalytics} from "react-icons/di";
import SearchBar from "./searchBar/SearchBar";
import {withRouter} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Header = ({history}) => {

    const handleClickDashboard = () => {
        history.push("/dashboard");
    };

    const handleClickAnalytics = () => {
        history.push("/analytics");
    };

    return (
        <AppBar position="static" style={{minWidth: 1000}}>
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">

                    <Grid item>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h6" component="span">
                                    Finder
                                </Typography>
                            </Grid>
                            <Grid item>
                                <SearchBar/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <IconButton aria-label="show dashboard" color="inherit" onClick={handleClickDashboard}>
                            <MdDashboard/> Dashboard
                        </IconButton>
                        <IconButton aria-label="show analytics" color="inherit" onClick={handleClickAnalytics}>
                            <DiGoogleAnalytics/> Analytics
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}


Header.propTypes = {

};


export default withRouter(Header);