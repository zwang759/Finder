import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

export const StyledAvatar = styled(Avatar)`
    background-color: var(--color-avatar);
`;

export const MultiLineTypography = styled(Typography)`
    white-space: pre-line;
`;

export const StyledChip = styled(Chip)`
    margin: 10px;
`;