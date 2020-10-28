import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import {IconButton} from "@material-ui/core";
import {AiOutlineClose} from "react-icons/ai";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {updateTags} from "../../../redux/pin/pin.actions";

const useStyles = makeStyles({
    root: {
        textTransform: "none"
    }
});

const UpdateTags = ({handleClose, item, updateTags}) => {
    const classes = useStyles();

    const [tags, setTags] = useState(item.tags ? item.tags : "");

    const onChange = e => {
        setTags(e.target.value);
    }

    const onSubmit = () => {
        updateTags(item, tags.split(","));
        handleClose();
    };


    return (
        <>
            <DialogTitle>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        Update tags
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => handleClose()}>
                            <AiOutlineClose/>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent dividers>
                <TextField
                    type="text"
                    label="Tags"
                    name="tags"
                    placeholder="please separate your tags by comma, your tags are only visible to you"
                    multiline
                    rowsMax={8}
                    value={tags}
                    onChange={onChange}
                    onKeyDown={e => e.stopPropagation()}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Grid container justify="space-between">
                    <Button variant="outlined" className={classes.root} onClick={() => handleClose()}> Discard </Button>
                    <Button variant="contained" className={classes.root} color="primary" onClick={onSubmit}> Save </Button>
                </Grid>
            </DialogActions>
        </>
    );
};


UpdateTags.propTypes = {
    updateTags: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
    updateTags: (item, tags) => dispatch(updateTags(item, tags))
});


export default connect(null, mapDispatchToProps)(UpdateTags);