import React from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import {makeStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import {BiTimeFive} from "react-icons/bi";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {withRouter} from "react-router-dom";
import {addSearchHistory, removeSearchHistory} from "../../../../redux/history/history.actions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        flexShrink: 0,
        marginLeft: "12px"
    },
    input: {
        width: 450,
        padding: "4px 4px",
        marginLeft: 8,
        flexShrink: 0
    },
    searchButton: {
        position: "absolute",
        left: 550,
        padding: 10
    },
    clearButton: {
        position: "absolute",
        left: 520,
        padding: 10
    },
    searchIcon: {
        fill: "var(--color-icons)"
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
    },
    overlay: {
        position: "absolute",
        width: 500,
        zIndex: "1",
        background: "var(--color-panel)"
    }
}));

const SearchBar = ({history, searches, addSearchHistory, removeSearchHistory}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [keywords, setKeywords] = React.useState("");

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleListKeyDown = (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    };

    const onKeyDown = (event) => {
        // if tab, close the suggestion
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
        // if arrow down, focus on the suggestion item
        if (event.key === "ArrowDown") {
            anchorRef.current.focus();
        }
        // if search, direct to result component
        if (event.key === "Enter") {
            event.preventDefault();
            addSearchHistory(keywords);
            history.push(`/search/results/?keywords=${keywords}`);
        }
    };

    const handleClear = () => {
        setKeywords("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addSearchHistory(keywords);
        history.push(`/search/results/?keywords=${keywords}`);
    };

    const onChange = (event) => {
        setKeywords(event.target.value);
    };

    const handleOnClickMenuItem = (pastSearch) => e => {
        setKeywords(pastSearch);
    };

    const handleOnClickRemove = (pastSearch) => e => {
        removeSearchHistory(pastSearch)
    };

    return (
        <>
            <Paper component="form" className={classes.root}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className={classes.wrapper}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search..."
                            inputProps={{"aria-label": "search"}}
                            onChange={onChange}
                            onFocus={handleClick}
                            value={keywords}
                            onKeyDown={onKeyDown}
                        />
                        {keywords.length > 0 ? <IconButton
                            className={classes.clearButton}
                            aria-label="clear"
                            onClick={handleClear}
                        >
                            <AiOutlineClose/>
                        </IconButton> : <> </>}

                        <IconButton
                            type="submit"
                            className={classes.searchButton}
                            aria-label="search"
                            onClick={handleSubmit}
                        >
                            <AiOutlineSearch className={classes.searchIcon}/>
                        </IconButton>
                    </div>
                </ClickAwayListener>

                {open &&
                <Paper className={classes.overlay}>
                    <MenuList onKeyDown={handleListKeyDown} ref={anchorRef}>
                        <MenuItem onClick={handleOnClickMenuItem("acme")}>
                            <ListItemIcon>
                                <AiOutlineSearch/>
                            </ListItemIcon>
                            <Typography variant="inherit">acme</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleOnClickMenuItem("hiring")}>
                            <ListItemIcon>
                                <AiOutlineSearch/>
                            </ListItemIcon>
                            <Typography variant="inherit">hiring</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleOnClickMenuItem("meeting")}>
                            <ListItemIcon>
                                <AiOutlineSearch/>
                            </ListItemIcon>
                            <Typography variant="inherit">boston</Typography>
                        </MenuItem>

                        {searches.length > 0 && searches.map(search =>
                            <Grid container justify="space-between" alignItems="center" key={search}>
                                <Grid item>
                            <MenuItem key={search} onClick={handleOnClickMenuItem(search)}>
                                <ListItemIcon>
                                    <BiTimeFive/>
                                </ListItemIcon>
                                <Typography variant="inherit">{search}</Typography>
                            </MenuItem>
                                 </Grid>
                                 <Grid item>
                                     <Button color="primary" onClick={handleOnClickRemove(search)}> Remove </Button>
                                 </Grid>
                             </Grid>
                        )}
                    </MenuList>
                </Paper>
                }

            </Paper>
        </>
    );
};


const mapStateToProps = (state) => ({
    searches: state.history.searches
});

const mapDispatchToProps = dispatch => ({
    addSearchHistory: keywords => dispatch(addSearchHistory(keywords)),
    removeSearchHistory: keywords => dispatch(removeSearchHistory(keywords))
});


export default
connect(mapStateToProps,
    mapDispatchToProps)
(withRouter(SearchBar));