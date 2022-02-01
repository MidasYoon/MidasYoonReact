import React, {Component} from "react";
import Menu from "./menu.jsx";
import Header from "./header.jsx";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from "@material-ui/core";
import * as style from "../../common/globalStyle.js";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = style.drawerWidth;

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: style.menuBackground,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
    },
});

class Layout extends Component {
    constructor(props) {
        super(props);

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);

        this.state = {
            mobileOpen: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.mobileOpen !== nextState.mobileOpen
        );
    }

    handleDrawerToggle() {
        this.setState({
            mobileOpen: ! this.state.mobileOpen,
        })
    }

    render () {
        const { classes, children } = this.props;
        const { mobileOpen } = this.state;
        const { handleDrawerToggle } = this;

        return (
            <ThemeProvider theme={style.seoulNamsan}>
                <div className={classes.root}>
                    <CssBaseline />
                    <Header
                        handleDrawerToggle={handleDrawerToggle}
                    />
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        <Hidden smUp implementation="css">
                            <Drawer
                                variant="temporary"
                                anchor='left'
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <Menu/>
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                <Menu/>
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </div>
            </ThemeProvider>
        );
    }
}

export default  withStyles(useStyles)(Layout);
