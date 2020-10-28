import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Slack from "../parts/resultItem/slack/Slack";
import Twitter from "../parts/resultItem/twitter/Twitter";
import Calendar from "../parts/resultItem/calendar/Calendar";
import Dropbox from "../parts/resultItem/dropbox/Dropbox";
import Contact from "../parts/resultItem/contact/Contact";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Separator} from "../searchResult/searchResult.styles";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles({
    displayPanel: {
        margin: "52px 40px 52px 74px",
        padding: "12px",
        minWidth: 600,
        justifyContent: "space-between",
        alignItems: "center"
    }
});

const Dashboard = ({items}) => {

    const classes = useStyles();


    const generateKey = (id, source) => {
        return id + source;
    };

    const getItem = (item) => {
        switch (item.source) {
            case "slack":
                return <Slack item={item}/>;
            case "tweet":
                return <Twitter item={item}/>;
            case "calendar":
                return <Calendar item={item}/>;
            case "dropbox":
                return <Dropbox item={item}/>;
            case "contacts":
                return <Contact item={item}/>;
            default: // unknown source, do nothing
        }
    };

    return (
        <>
            {items && <Paper className={classes.displayPanel}>
                <div>
                    <Typography variant="body2"
                                color="textSecondary">{items.length} pined items </Typography>
                </div>
                {items.length > 0 && items.map(item =>
                    <React.Fragment key={generateKey(item.id, item.source)}>
                        {getItem(item)}
                        <Separator/>
                    </React.Fragment>)}
            </Paper>}
        </>

    );
};

Dashboard.propTypes = {
    items: PropTypes.array
};

const mapStateToProps = (state) => ({
    items: state.pin.items
});

export default connect(
    mapStateToProps,
    null)
(Dashboard);