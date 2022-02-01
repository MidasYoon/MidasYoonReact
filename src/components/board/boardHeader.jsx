import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

import * as util from '../../common/util.js';

const useStyles = (theme) => ({
    root: {
        width: "100%",
        border: "none",
        borderBottom: "1px solid #aaa",
        marginBottom: theme.spacing(4),
        padding: theme.spacing(1),
    },
    tbHeader1: {
        width: 60,
        padding: 0,
        textAlign: "center",
        borderBottom: "none",
    },
    tbBody: {
        borderBottom: "none",
    },
    avatar: {
        margin: "auto",
    },
    title: {
        fontSize: "20pt",
        fontWeight: "bold",
    },
    nickname: {
        fontWeight: "bold",
    },
    createdAt: {
        color: "#666",
    },
});

class BoardHeader extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.title !== nextProps.title
            || this.props.subtitle !== nextProps.subtitle
            || this.props.userNickname !== nextProps.userNickname
            || this.props.createdAt !== nextProps.createdAt
        );
    }

    render () {
        const { classes } = this.props;
        const { title, subtitle, userNickname, createdAt } = this.props;

        return (
            <div className={classes.root}>
                <span className={classes.title}>{title}</span>
                {
                    subtitle ? <span>&nbsp;{subtitle}</span> : null
                }
                {
                    userNickname ?
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell className={classes.tbHeader1}>
                                        <Avatar alt={userNickname} className={classes.avatar} src="#"/>
                                    </TableCell>
                                    <TableCell className={classes.tbBody}>
                                        <Typography className={classes.nickname}>
                                            {userNickname}
                                        </Typography>
                                        <span className={classes.createdAt}>{util.formatDate(createdAt, true)}</span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    : null
                }
            </div>
        )
    }
}

BoardHeader.defaultProps = {
    title: "",
    subtitle: "",
    userNickname: "",
    createdAt: "",
}

export default withStyles(useStyles)(BoardHeader);
