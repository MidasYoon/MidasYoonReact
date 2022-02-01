import React, {Component} from "react";
import { withStyles } from "@material-ui/core";

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import * as style from "../../common/globalStyle.js";

import LoginModal from './login.jsx';
import MemberMenu from './memberMenu.jsx';

const useStyles = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: style.appBarColor,
        boxShadow: "none",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
    },
});

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLoginModal = this.handleLoginModal.bind(this);

        this.state = {
            loginModalOpen: false,
        }
    }

    handleLoginModal(isOpen) {
        this.setState({
            loginModalOpen: isOpen
        })
    }
  
    render () {
        const { classes } = this.props;
        const { handleDrawerToggle } = this.props;
        
        const { handleLoginModal } = this;
        const { loginModalOpen } = this.state;

        return (
            <React.Fragment>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link href="/" color="inherit" style={{ textDecoration: 'none' }} className={classes.title}>
                            <Typography variant="h6">
                                Midas Yoon
                            </Typography>
                        </Link>
                        {
                            (() => {
                                // if (typeof controlData !== 'undefined') {
                                //     if (controlData.config.id) {
                                //         return <MemberMenu/>;
                                //     } else {
                                //         return <Button color="inherit" onClick={() => handleLoginModal(true)}>로그인</Button>
                                //     }
                                // }
                            })()
                        }
                    </Toolbar>
                </AppBar>
                <LoginModal
                    handleClose={() => handleLoginModal(false)}
                    open={loginModalOpen}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Header);
