import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {CardContent} from "@material-ui/core";
import {FaRegCalendarAlt} from "react-icons/fa";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {AiOutlinePushpin, AiOutlineDelete, AiOutlineTags} from "react-icons/ai";
import {VscPin} from "react-icons/vsc";
import IconButton from "@material-ui/core/IconButton";
import {StyledChip} from "./calendar.styles";
import Box from "@material-ui/core/Box";
import moment from "moment";
import {deleteATag, pinItem, unpinItem} from "../../../../redux/pin/pin.actions";
import {useLocation} from "react-router-dom";
import IconModal from "../../iconModal/iconModal";
import UpdateTags from "../../updateTags/updateTags";


const Calendar = ({item, pinItem, unpinItem, deleteATag, items}) => {

    const {title, location, from, to, invitees, url, tags} = item;

    const generateKey = (id, source) => {
        return id + source;
    };

    const localPath = useLocation().pathname;
    const getPinButton = () => {
        if (localPath === "/dashboard" ||
            items.some(element => generateKey(element.id, element.source) === generateKey(item.id, item.source))) {
            return (
                <IconButton aria-label="pin" onClick={handleUnpin}>
                    <VscPin/>
                </IconButton>
            );
        }
        return (
            <IconButton aria-label="pin" onClick={handlePin}>
                <AiOutlinePushpin/>
            </IconButton>
        );
    };

    const handleDelete = (tag) => (e) => {
        deleteATag(item, tag);
    };

    const handlePin = () => {
        pinItem(item);
    };

    const handleUnpin = () => {
        unpinItem(item);
    };

    return (
        <>
            <CardContent>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item>
                                <FaRegCalendarAlt size={30} color="var(--color-icons)"/>
                            </Grid>
                            <Grid item>
                                <Box component="span" fontWeight={700}>
                                    <Typography component="span" variant="body1" style={{fontWeight: 'inherit'}}>
                                        {title}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="delete">
                            <AiOutlineDelete/>
                        </IconButton>
                        <IconModal icon={<AiOutlineTags/>} content={<UpdateTags item={item}/>}/>
                        {getPinButton()}
                    </Grid>
                </Grid>


                <Typography component="span" variant="body1" color="primary">
                    {moment(from).format("MMMM Do YYYY, h:mm A") + " to "}
                </Typography>

                <Typography component="span" variant="body1" color="primary">
                    {moment(to).format("h:mm A")}
                </Typography>

                <Typography/>

                {location && <Typography variant="body1" gutterBottom>
                    {location}
                </Typography>}

                {invitees && <Typography variant="body1" gutterBottom>
                    {invitees}
                </Typography>}

                {url && <Typography variant="body1" gutterBottom>
                    {url}
                </Typography>}

                {tags && tags.length > 0 && tags.map(tag =>
                    <StyledChip
                        label={tag}
                        color="primary"
                        onDelete={handleDelete}
                    />
                )}
            </CardContent>
        </>
    );
};

Calendar.propTypes = {
    item: PropTypes.object.isRequired,
    pinItem: PropTypes.func.isRequired,
    unpinItem: PropTypes.func.isRequired,
    deleteATag: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    items: state.pin.items
});

const mapDispatchToProps = dispatch => ({
    pinItem: item => dispatch(pinItem(item)),
    unpinItem: item => dispatch(unpinItem(item)),
    deleteATag: (item, tag) => dispatch(deleteATag(item, tag))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);