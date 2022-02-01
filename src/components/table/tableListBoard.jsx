import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

import * as style from '../../common/globalStyle.js';
import * as util from '../../common/util.js';

const useStyles = (theme) => ({
    table: {
    },
    link: {
        cursor: 'pointer',
        "&:hover": {
            color: style.linkHoverColor,
            textDecoration: 'none',
        },
    },
    header: {
        backgroundColor: '#212529',
        color: '#fff',
        fontSize: 14,
    },
    listCellForMobile: {
        padding: theme.spacing(1),
    },
    titleForMobile: {
        fontSize: "13pt",
        margin: 0,
    },
    subtitleForMobile: {
        color: "#777",
        margin: 0,
    },
    commentCnt: {
        color: "dodgerblue",
        fontWeight: "bold",
    },
    fileButton: {
        padding:0,
        color: "#000"
    },
});

class TableListBoard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.listTotal !== nextProps.listTotal
            || this.props.listRow !== nextProps.listRow
            || this.props.linkUrl !== nextProps.linkUrl
        );
    }

    render () {
        const { classes } = this.props;

        const { listTotal, listRow, linkUrl } = this.props;

        return (
            <React.Fragment>
                <Typography component="p" gutterBottom>총 {listTotal} 건</Typography>
                <Hidden smDown implementation="css">
                    <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.header} align="center">작성일</TableCell>
                                <TableCell className={classes.header}>제목</TableCell>
                                <TableCell className={classes.header}>작성자</TableCell>
                                <TableCell className={classes.header} align="right">조회수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listRow.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{util.formatDate(row.createdAt)}</TableCell>
                                        <TableCell>
                                            <Link href={linkUrl + row.id} color="inherit" className={classes.link}>
                                                {row.title}
                                                {
                                                    row.fileCount > 0 ?
                                                        <IconButton className={classes.fileButton}>&nbsp;<SaveIcon fontSize="small"/></IconButton>
                                                    : null
                                                }
                                                {
                                                    row.commentCount > 0 ?
                                                        <span className={classes.commentCnt}>&nbsp;[{row.commentCount}]</span>
                                                    : null
                                                }
                                            </Link>
                                        </TableCell>
                                        <TableCell>{row.nickname}</TableCell>
                                        <TableCell align="right">{util.formatNumber(row.readCount)}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Hidden>
                <Hidden mdUp implementation="css">
                    <Table className={classes.table} size="small">
                        <TableBody>
                            {
                                listRow.map((row, index) => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell className={classes.listCellForMobile}>
                                                <Link href={linkUrl + row.id} color="inherit" className={classes.link}>
                                                    <p className={classes.titleForMobile}>
                                                        {row.title}
                                                        {
                                                            row.fileCount > 0 ?
                                                                <IconButton className={classes.fileButton}>&nbsp;<SaveIcon fontSize="small"/></IconButton>
                                                            : null
                                                        }
                                                        {
                                                            row.commentCount > 0 ?
                                                                <span className={classes.commentCnt}>&nbsp;[{row.commentCount}]</span>
                                                            : null
                                                        }
                                                    </p>
                                                </Link>
                                                <p className={classes.subtitleForMobile}>{row.nickname} {util.formatDate(row.createdAt)} 조회수: {util.formatNumber(row.readCount)}</p>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Hidden>
            </React.Fragment>
        )
    }
}

TableListBoard.defaultProps = {
    listTotal: 0,
    listRow: [],
    linkUrl: '',
}

export default withStyles(useStyles)(TableListBoard);
