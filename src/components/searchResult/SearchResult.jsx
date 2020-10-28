import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import {fetchCollectionsStart} from "../../redux/result/result.action";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Slack from "../parts/resultItem/slack/Slack";
import Twitter from "../parts/resultItem/twitter/Twitter";
import Calendar from "../parts/resultItem/calendar/Calendar";
import Dropbox from "../parts/resultItem/dropbox/Dropbox";
import Contact from "../parts/resultItem/contact/Contact";
import {Container, Separator} from "./searchResult.styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
    displayPanel: {
        margin: "52px 40px 52px 74px",
        padding: "12px",
        minWidth: 600,
        justifyContent: "space-between",
        alignItems: "center"
    }
});

const SearchResult = ({
                          fetchCollectionsStart,
                          result: {results, isFetching}
                      }) => {

    const classes = useStyles();

    // useLocation().search = "keywords?=[keywords]", so substring it from 10th index for [keywords]
    const keywords = useLocation().search.slice(10);

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

    React.useEffect(() => {
        fetchCollectionsStart(keywords);
    }, [keywords]);


    return (
        <>
            {isFetching ?
                <Container>
                    <CircularProgress size="10rem" thickness={6}/>
                </Container> :

                <Paper className={classes.displayPanel}>
                    <div>
                        <Typography variant="body2"
                                    color="textSecondary">Found {results.length} results</Typography>
                    </div>
                    {results.length > 0 && results.map(result =>
                        <React.Fragment key={generateKey(result.id, result.source)}>
                            {getItem(result)}
                            <Separator/>
                        </React.Fragment>)}
                </Paper>
            }
        </>
    );
};

SearchResult.propTypes = {
    fetchCollectionsStart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    result: state.result
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: (keywords) => dispatch(fetchCollectionsStart(keywords))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResult);