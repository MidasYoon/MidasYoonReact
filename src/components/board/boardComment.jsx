import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";
import ButtonGroup from '../button/buttonGroup.jsx';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from "@material-ui/core/Popover";
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import * as util from '../../common/util.js';
import * as style from "../../common/globalStyle.js";

const useStyles = theme => ({
    comments: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        width: '100%',
    },
    comment: {
        padding: 0,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    commentUser: {
        fontWeight: 'bold',
    },
    commentAt: {
        color: "#999",
    },
    commentContent: {
        whiteSpace: 'pre-line',
    },
    input: {
        width: '100%',
    },
    commentMenu: {
        "&:hover": {
            backgroundColor: style.memberPopperMenuActive,
        }
    },
});

class BoardComments extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCommentModify = this.handleChangeCommentModify.bind(this);
        this.handleClickCommentMenu = this.handleClickCommentMenu.bind(this);
        this.handleCloseCommentMenu = this.handleCloseCommentMenu.bind(this);

        this.commentRegister =  this.commentRegister.bind(this);
        this.commentCancel = this.commentCancel.bind(this);
        this.commentModifyMode = this.commentModifyMode.bind(this);
        this.commentRemove = this.commentRemove.bind(this);
        this.commentModifyCancel = this.commentModifyCancel.bind(this);
        this.commentModify = this.commentModify.bind(this);

        this.state = {
            inputComment: '',
            buttonList: [
                { color: 'lime', label: '취소', onClick: this.commentCancel },
                { color: 'indigo', label: '댓글', onClick: this.commentRegister },
            ],

            anchorEl: null,
            openedPopoverId: 0,

            commentModifyId: 0,
            commentModifyContent: '',
            buttonListForModify: [
                { color: 'lightGreen', label: '취소', onClick: this.commentModifyCancel },
                { color: 'lightBlue', label: '수정', onClick: this.commentModify },
            ],
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.comments !== nextProps.comments
            || this.state.inputComment !== nextState.inputComment
            || this.state.anchorEl !== nextState.anchorEl
            || this.state.openedPopoverId !== nextState.openedPopoverId
            || this.state.commentModifyId !== nextState.commentModifyId
            || this.state.commentModifyContent !== nextState.commentModifyContent
        );
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({ inputComment: value });
    }

    handleClickCommentMenu(event, popoverId) {
        this.setState({ 
            anchorEl: event.target,
            openedPopoverId: popoverId,
        });
    }

    handleCloseCommentMenu() {
        this.setState({ 
            anchorEl: null,
            openedPopoverId: 0,
        });
    }

    commentRegister() {
        const { inputComment } = this.state;
        const { registerAction } = this.props;

        registerAction(inputComment);
    }

    commentCancel() {
        this.setState({ inputComment: '' });
    }

    commentModifyMode(commentId, commentContent) {
        this.setState({ 
            commentModifyId: commentId,
            commentModifyContent: commentContent,
        });
        this.handleCloseCommentMenu();
    }

    handleChangeCommentModify(event) {
        let value = event.target.value;
        this.setState({ commentModifyContent: value });
    }

    commentModifyCancel() {
        this.setState({
            commentModifyId: 0,
            commentModifyContent: '',
        });
    }

    commentModify() {
        const { commentModifyId, commentModifyContent } = this.state;
        const { modifyAction } = this.props;

        modifyAction(commentModifyId, commentModifyContent);
    }

    commentRemove(commentId) {
        const { removeAction } = this.props;
        removeAction(commentId);
    }

    render () {
        const { classes } = this.props;
        
        const { comments } = this.props;
        const { inputComment, buttonList, buttonListForModify } = this.state;

        const { anchorEl, openedPopoverId, commentModifyId, commentModifyContent } = this.state;
        const { handleChange, handleClickCommentMenu, handleCloseCommentMenu, handleChangeCommentModify } = this;
        const { commentModifyMode, commentRemove } =  this;

        return (
            <div className={classes.comments}>
                <Typography variant="h6" gutterBottom>댓글 {comments.length}개</Typography>
                {
                    // controlData.config.id > 0 ?
                    //     <React.Fragment>
                    //         <ListItem className={classes.comment} alignItems="flex-start">
                    //             <ListItemAvatar>
                    //                 <Avatar alt={controlData.config.nickname} src="#"/>
                    //             </ListItemAvatar>
                    //             <TextField
                    //                 size="small"
                    //                 multiline
                    //                 value={inputComment}
                    //                 className={classes.input}
                    //                 onChange={handleChange}
                    //                 placeholder="공개 댓글 추가..."
                    //             />
                    //         </ListItem>
                    //         <ButtonGroup buttonList={buttonList} align="right"/>
                    //     </React.Fragment>
                    // : null
                }
                <List>
                    {
                        comments.map((item, index) => {
                            if (commentModifyId === item.id) {
                                return (
                                    <React.Fragment key={index}>
                                        <ListItem className={classes.comment} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={item.user.nickname} src="#"/>
                                            </ListItemAvatar>
                                            <TextField
                                                size="small"
                                                multiline
                                                value={commentModifyContent}
                                                className={classes.input}
                                                onChange={handleChangeCommentModify}
                                            />
                                        </ListItem>
                                        <ButtonGroup buttonList={buttonListForModify} align="right"/>
                                    </React.Fragment>
                                )
                            } else {
                                return (
                                    <ListItem key={index} className={classes.comment} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={item.user.nickname} src="#"/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    <Typography component="span" className={classes.commentUser}>
                                                        {item.user.nickname}
                                                    </Typography>
                                                    <Typography component="span" variant="body2" className={classes.commentAt}>
                                                        &nbsp;{util.formatDate(item.createdAt, true)}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography component="span" color="textPrimary"className={classes.commentContent}>
                                                        {item.content}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        {
                                            // item.user_id === controlData.config.id ?
                                            //     <React.Fragment>
                                            //         <IconButton onClick={(event) => handleClickCommentMenu(event, item.id)}>
                                            //             <MoreVertIcon/>
                                            //         </IconButton>
                                            //         <Popover
                                            //             anchorEl={anchorEl}
                                            //             keepMounted
                                            //             open={openedPopoverId === item.id}
                                            //             onClose={handleCloseCommentMenu}
                                            //             getContentAnchorEl={null}
                                            //             anchorOrigin={{
                                            //                 vertical: 'top',
                                            //                 horizontal: 'left',
                                            //             }}
                                            //             transformOrigin={{
                                            //                 vertical: 'top',
                                            //                 horizontal: 'right',
                                            //             }}
                                            //             PaperProps={{
                                            //                 style: {
                                            //                     borderRadius: 0,
                                            //                     border: "1px solid " + style.memberPopperMenuActive,
                                            //                 },
                                            //                 elevation: 0,
                                            //             }}
                                            //         >
                                            //             <MenuItem className={classes.commentMenu} onClick={() => commentModifyMode(item.id, item.content)}>
                                            //                 <ListItemIcon>
                                            //                     <CreateIcon fontSize="small" />
                                            //                 </ListItemIcon>
                                            //                 <ListItemText primary={"수정"} />
                                            //             </MenuItem>
                                            //             <MenuItem className={classes.commentMenu} onClick={() => commentRemove(item.id)}>
                                            //                 <ListItemIcon>
                                            //                     <DeleteIcon fontSize="small" />
                                            //                 </ListItemIcon>
                                            //                 <ListItemText primary="삭제" />
                                            //             </MenuItem>
                                            //         </Popover>
                                            //     </React.Fragment>
                                            // : null
                                        }
                                    </ListItem>
                                )
                            }
                        })
                    }
                </List>
            </div>
        )
    }
}

BoardComments.defaultProps = {
    comments: [],
    registerAction: function () {},
    removeAction: function () {},
    modifyAction: function () {},
}

export default withStyles(useStyles)(BoardComments);