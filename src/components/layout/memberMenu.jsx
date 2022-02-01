import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Popover from "@material-ui/core/Popover";
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Loading from '../loading/loading.jsx';

import * as util from '../../common/util.js';
import * as url from '../../common/url.js';
import * as style from "../../common/globalStyle.js";

import { blueGrey } from '@material-ui/core/colors';

const useStyles = (theme) => ({
    nested: {
        "&:hover": {
            backgroundColor: style.memberPopperMenuActive,
        }
    },
    blueGrey: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blueGrey[500],
    },
});

class MemberMenu extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.logoutAction = this.logoutAction.bind(this);
        this.setLoading = this.setLoading.bind(this);

        this.state = {
            loading: false,
            anchorEl: null,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.state.anchorEl !== nextState.anchorEl
        );
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    logoutAction() {
        util.asyncRequest({
            setLoading: this.setLoading,
            url : url.memberPath.inAjax + 'logout',
            method: 'POST',
            success: (result) => {
                util.locationHref("/");
            }
        });
    }

    render () {
        const { classes } = this.props;
        const { anchorEl, loading } = this.state;
        const { handleClick, handleClose } = this;
        const { logoutAction } = this;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <IconButton onClick={handleClick}>
                    {/*<Avatar alt={controlData.config.nickname} className={classes.blueGrey} src="#"/>*/}
                </IconButton>
                <Popover
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        style: {
                            borderRadius: 0,
                            border: "1px solid " + style.memberPopperMenuActive,
                        },
                        elevation: 0,
                    }}
                >
                    <Link href={url.memberPath.inPage + "info"} color="inherit" style={{ textDecoration: 'none' }}>
                        <MenuItem className={classes.nested} >
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="내 정보 보기/수정" />
                        </MenuItem>
                    </Link>
                    <MenuItem className={classes.nested} onClick={logoutAction}>
                        <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="로그아웃" />
                    </MenuItem>
                </Popover>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(MemberMenu);
