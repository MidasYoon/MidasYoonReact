import React, {Component} from "react";
import { withStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import DirectionsRailwayIcon from '@material-ui/icons/DirectionsRailway';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import * as style from "../../common/globalStyle.js";
import * as url from "../../common/url.js";

// https://materialdesignicons.com/
import Icon from '@mdi/react'
import { mdiExcavator } from '@mdi/js';

const useStyles = (theme) => ({
    toolbar: theme.mixins.toolbar,
    zIndex: {
        zIndex: theme.zIndex.drawer - 1,
        backgroundColor: style.appBarColor,
    },
    divider: {
        backgroundColor: 'none'
    },
    menuDivider: {
        backgroundColor: style.menuDivider,
    },
    list: {
        margin: 0,
        padding: 0,
    },
    outerMenu: {
        backgroundColor: style.outerMenu,
        "&:hover": {
            backgroundColor: style.outerMenuActive,
        }
    },
    nested: {
        backgroundColor: style.nestedMenu,
        paddingLeft: theme.spacing(4),
        "&:hover": {
            backgroundColor: style.nestedMenuActive,
        }
    },
});


class Menu extends Component {
    constructor(props) {
        super(props);

        this.handleClickBoard = this.handleClickBoard.bind(this);
        this.handleClickProgramming = this.handleClickProgramming.bind(this);
        this.handleClickTransport = this.handleClickTransport.bind(this);
        this.handleClickTrip = this.handleClickTrip.bind(this);
        this.handleClickLab = this.handleClickLab.bind(this);
        this.handleClickAdmin = this.handleClickAdmin.bind(this);
        this.closeAll = this.closeAll.bind(this);

        this.state = ({
            openBoard: false,
            openProgramming: false,
            openTransport: false,
            openTrip: false,
            openLab: false,
            openAdmin: false,
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.openBoard !== nextState.openBoard
            || this.state.openProgramming !== nextState.openProgramming
            || this.state.openTransport !== nextState.openTransport
            || this.state.openTrip !== nextState.openTrip
            || this.state.openLab !== nextState.openLab
            || this.state.openAdmin !== nextState.openAdmin
        );
    }

    handleClickBoard() {
        const { openBoard } = this.state;
        this.closeAll();
        this.setState({
            openBoard: ! openBoard,
        });
    }

    handleClickProgramming() {
        const { openProgramming } = this.state;
        this.closeAll();
        this.setState({
            openProgramming: ! openProgramming,
        });
    }

    handleClickTransport() {
        const { openTransport } = this.state;
        this.closeAll();
        this.setState({
            openTransport: ! openTransport,
        });
    }

    handleClickTrip() {
        const { openTrip } = this.state;
        this.closeAll();
        this.setState({
            openTrip: ! openTrip,
        });
    }

    handleClickLab() {
        const { openLab } = this.state;
        this.closeAll();
        this.setState({
            openLab: ! openLab,
        });
    }

    handleClickAdmin() {
        const { openAdmin } = this.state;
        this.closeAll();
        this.setState({
            openAdmin: ! openAdmin,
        });
    }

    closeAll() {
        this.setState({
            openBoard: false,
            openProgramming: false,
            openTransport: false,
            openTrip: false,
            openLab: false,
            openAdmin: false,
        });
    }

    render () {
        const { classes } = this.props;
        const { openBoard, openProgramming, openTransport, openTrip, openLab, openAdmin } = this.state;
        const { handleClickBoard, handleClickProgramming, handleClickTransport, handleClickTrip, handleClickLab, handleClickAdmin } = this;

        return (
            <React.Fragment>
                <div className={clsx(classes.toolbar, classes.zIndex)} />
                <Divider className={classes.divider} />
                <List className={classes.list}>
                    <ListItem button className={classes.outerMenu}
                        onClick={handleClickBoard}
                    >
                        <ListItemIcon><SpeakerNotesIcon /></ListItemIcon>
                        <ListItemText primary="게시판" />
                        {openBoard ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openBoard} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href={url.boardPath.page} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="공지 사항" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <Divider className={classes.menuDivider}/>

                    <ListItem button className={classes.outerMenu}
                        onClick={handleClickProgramming}
                    >
                        <ListItemIcon><KeyboardIcon /></ListItemIcon>
                        <ListItemText primary="프로그래밍" />
                        {openProgramming ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openProgramming} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href={url.progPath.page + "php"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="PHP" />
                                </ListItem>
                            </Link>
                            <Link href={url.progPath.page + "dp"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="디자인 패턴" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <Divider className={classes.menuDivider}/>

                    <ListItem button className={classes.outerMenu}
                        onClick={handleClickTransport}
                    >
                        <ListItemIcon><DirectionsRailwayIcon /></ListItemIcon>
                        <ListItemText primary="교통 정보" />
                        {openTransport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openTransport} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href={url.transportPath.train.page + "timetable"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="철도 시간표" />
                                </ListItem>
                            </Link>
                            <Link href={url.transportPath.train.page + "stamps"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="철도 스탬프" />
                                </ListItem>
                            </Link>
                            <Link href={url.transportPath.bus.page + "busList"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="버스 노선" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <Divider className={classes.menuDivider}/>

                    <ListItem button className={classes.outerMenu}
                        onClick={handleClickTrip}
                    >
                        <ListItemIcon><PhotoLibraryIcon /></ListItemIcon>
                        <ListItemText primary="여행 정보" />
                        {openTrip ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openTrip} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href={url.travelPath.page} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="여행 사진 갤러리" />
                                </ListItem>
                            </Link>
                            <Link href={url.travelPath.page + "track"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="라이딩/트래킹 코스 보기" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <Divider className={classes.menuDivider}/>

                    <ListItem button className={classes.outerMenu}
                        onClick={handleClickLab}
                    >
                        <ListItemIcon><Icon path={mdiExcavator} size={1} color="rgba(0, 0, 0, 0.54)"/></ListItemIcon>
                        <ListItemText primary="Lab" />
                        {openLab ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openLab} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href={url.laboratoryPath.page + "bible"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="Bible" />
                                </ListItem>
                            </Link>
                            <Link href={url.laboratoryPath.page + "chinese_letter"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="Chinese Letter" />
                                </ListItem>
                            </Link>
                            <Link href={url.laboratoryPath.page + "gpxEdit/cut"} color="inherit" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary="GPX 에디터" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <Divider className={classes.menuDivider}/>
                    {
                        (() => {
                            // if (typeof controlData !== 'undefined') {
                            //     if (controlData.config.auth_id == 1) {
                            if (false) {
                                if (false) {
                                    return (
                                        <React.Fragment>
                                            <ListItem button className={classes.outerMenu}
                                                onClick={handleClickAdmin}
                                            >
                                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                                <ListItemText primary="관리자 메뉴" />
                                                {openAdmin ? <ExpandLess /> : <ExpandMore />}
                                            </ListItem>
                                            <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <Link href={url.boardPath.adminPage + "noticeRegister"} color="inherit" style={{ textDecoration: 'none' }}>
                                                        <ListItem button className={classes.nested}>
                                                            <ListItemText primary="공지사항 작성" />
                                                        </ListItem>
                                                    </Link>
                                                    <Link href={url.progPath.adminPage + "register"} color="inherit" style={{ textDecoration: 'none' }}>
                                                        <ListItem button className={classes.nested}>
                                                            <ListItemText primary="프로그래밍 게시글 작성" />
                                                        </ListItem>
                                                    </Link>
                                                    <Link href={url.transportPath.bus.adminPage + "busRegister"} color="inherit" style={{ textDecoration: 'none' }}>
                                                        <ListItem button className={classes.nested}>
                                                            <ListItemText primary="버스노선 등록" />
                                                        </ListItem>
                                                    </Link>
                                                </List>
                                            </Collapse>

                                            <Divider className={classes.menuDivider}/>
                                        </React.Fragment>
                                    )
                                }
                            }
                        })()
                    }
                </List>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(Menu);
