import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Loading from '../../../components/loading/loading.jsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import SaveIcon from '@material-ui/icons/Save';

import * as style from '../../../common/globalStyle.js';
import * as util from '../../../common/util.js';
import * as url from '../../../common/url.js';

const useStyles = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: style.indexAppbarColor,
        boxShadow: "none",
    },
    toolBar: {
        minHeight: 40,
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        flexGrow: 1,
    },
    moreButton: {
        padding:0,
        color: "#fff"
    },
    table: {
        borderRadius: 0,
        border: "1px solid rgba(224, 224, 224, 1)",
        boxShadow: 'none',
    },
    link: {
        textDecoration: 'none',
        "&:hover": {
            color: style.linkHoverColor,
            textDecoration: 'none',
        }
    },
    comment: {
        color: style.boardCommentCntColor,
        fontSize: "10pt",
        fontWeight: "bold",
    },
    fileButton: {
        padding:0,
        color: "#000"
    }
});

class BoardNoticeList extends Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.getNotice = this.getNotice.bind(this);

        this.state = {
            loading: false,
            boardData: [],
        }
    }

    componentDidMount() {
        this.getNotice();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.state.boardData !== nextState.boardData
        );
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    getNotice() {
        util.asyncRequest({
            setLoading: this.setLoading,
            method: util.requestMethod.GET,
            url : url.boardPath.ajax,
            data: {
                page: 1,
                size: 10,
            },
            success: (result) => {
                this.setState({
                    boardData: result.content
                })
            }
        });
    }

    render () {
        const { classes } = this.props;

        const { loading, boardData } = this.state;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar variant="dense" className={classes.toolBar}>
                        <Typography className={classes.title}>공지사항</Typography>
                        <Link href={url.boardPath.page}>
                            <IconButton className={classes.moreButton}>
                                <AddIcon/>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
                <TableContainer component={Paper} className={classes.table}>
                    <Table size="small">
                        <TableBody>
                            {
                                boardData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            <Link href={url.boardPath.page + "/" + row.id} color="inherit" className={classes.link}>
                                                { util.stringShorten(row.title, 25) }
                                                { row.commentCount > 0 ? <span className={classes.comment}>[{ row.commentCount }]</span> : null}
                                                { row.fileCount > 0 ? <IconButton className={classes.fileButton}><SaveIcon fontSize="small"/></IconButton> : null }
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(BoardNoticeList);