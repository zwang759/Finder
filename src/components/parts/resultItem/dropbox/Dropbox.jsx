import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";
import {CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import {
    AiOutlineFilePdf,
    AiOutlineFileText,
    AiOutlinePlaySquare,
    AiOutlineFileImage,
    AiOutlineFileZip,
    AiOutlineFileExcel,
    AiOutlineFilePpt,
    AiOutlineFile,
    AiOutlinePushpin,
    AiOutlineDelete, AiOutlineTags
}
    from "react-icons/ai";
import {BsFileCode} from "react-icons/bs";
import moment from 'moment';
import Box from "@material-ui/core/Box";
import {deleteATag, pinItem, unpinItem} from "../../../../redux/pin/pin.actions";
import {StyledChip} from "./dropbox.styles";
import {VscPin} from "react-icons/vsc";
import UpdateTags from "../../updateTags/updateTags";
import IconModal from "../../iconModal/iconModal";

const Dropbox = ({item, pinItem, unpinItem, deleteATag, items}) => {
    const {path, title, shared_with, created, tags} = item;

    const getFilenameExtension = (path) => {
        const startIdx = path.lastIndexOf(".");
        return startIdx > 0 ? path.slice(path.lastIndexOf(".")) : "";
    };

    const FileIcon = (path) => {
        switch (getFilenameExtension(path)) {
            case ".pdf":
                return <AiOutlineFilePdf size={70} color="var(--color-avatar)"/>;
            case ".txt":
            case ".docx":
                return <AiOutlineFileText size={70} color="var(--color-avatar)"/>;
            case ".webm":
            case ".ogg":
            case ".mkv":
            case ".avi":
            case ".h264":
            case ".m4v":
            case ".mov":
            case ".wmv":
            case ".mp4":
                return <AiOutlinePlaySquare size={70} color="var(--color-avatar)"/>;
            case ".cpp":
            case ".c":
            case ".cgi":
            case ".pl":
            case ".cs":
            case ".h":
            case ".java":
            case ".php":
            case ".py":
            case ".sh":
            case ".swift":
            case ".vb":
                return <BsFileCode size={70} color="var(--color-avatar)"/>;
            case ".ai":
            case ".bmp":
            case ".gif":
            case ".ico":
            case ".jpeg":
            case ".jpg":
            case ".png":
            case ".ps":
            case ".psd":
            case ".svg":
            case ".tif":
            case ".tiff":
                return <AiOutlineFileImage size={70} color="var(--color-avatar)"/>;
            case ".zip":
            case ".7z":
            case ".rar":
            case ".z":
            case ".gz":
                return <AiOutlineFileZip size={70} color="var(--color-avatar)"/>;
            case ".xls":
            case ".xlsx":
                return <AiOutlineFileExcel size={70} color="var(--color-avatar)"/>;
            case ".ppt":
            case ".pptx":
            case ".key":
                return <AiOutlineFilePpt size={70} color="var(--color-avatar)"/>;
            default:
                return <AiOutlineFile size={70} color="var(--color-avatar)"/>;
        }
    };

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
                        <Grid container justify="flex-start" alignItems="center">
                            <Grid item>
                                {FileIcon(path)}
                            </Grid>

                            <Grid item>
                                <Link to={path}>
                                    <Box component="span" fontWeight={700}>
                                        <Typography variant="body1" style={{fontWeight: 'inherit'}}>
                                            {title}
                                        </Typography>
                                    </Box>
                                </Link>

                                <Typography variant="body1" color="textSecondary">
                                    {moment(created).format('MMMM Do YYYY')}
                                </Typography>

                                <Typography variant="body1" color="textSecondary">
                                    shared with: {shared_with}
                                </Typography>
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

                {tags && tags.length > 0 && tags.map((tag) =>
                    <StyledChip
                        key={tag}
                        label={tag}
                        color="primary"
                        onDelete={handleDelete(tag)}
                    />
                )}
            </CardContent>
        </>
    );
};

Dropbox.propTypes = {
    pinItem: PropTypes.func.isRequired,
    unpinItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
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
)(Dropbox);
