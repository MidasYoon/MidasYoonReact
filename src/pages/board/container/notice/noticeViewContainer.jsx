import React, {Component} from "react";
import Container from '@material-ui/core/Container';

import Loading from '../../../../components/loading/loading.jsx';
import PageTitle from '../../../../components/title/pageTitle.jsx';

import BoardHeader from '../../../../components/board/boardHeader.jsx';
import BoardBody from '../../../../components/board/boardBody.jsx';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '../../../../components/button/buttonGroup.jsx';
import BoardComment from '../../../../components/board/boardComment.jsx';

import * as util from '../../../../common/util.js';
import * as url from '../../../../common/url.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noticeAction from '../../store/modules/notice.js';

class NoticeViewContainer extends Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.boardNoticeList = this.boardNoticeList.bind(this);
        this.boardNoticeModify = this.boardNoticeModify.bind(this);

        this.boardBody = React.createRef();
        this.getNoticeData = this.getNoticeData.bind(this);
        this.downloadFile = this.downloadFile.bind(this);

        this.commentComponent = React.createRef();
        this.registerComment = this.registerComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.modifyComment = this.modifyComment.bind(this);

        this.state = {
            loading: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.props.board !== nextProps.board
            || this.props.comments !== nextProps.comments
            || this.props.files !== nextProps.files
            || this.props.buttonList !== nextProps.buttonList
        );
    }

    componentDidMount() {
        this.getNoticeData();
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    boardNoticeList() {
        const { history } = this.props;
        util.locationHref(history, url.boardPath.page);
    }

    boardNoticeModify() {
        const { id } = this.props;
        // util.locationHref(url.boardPath.adminPage + "noticeModify/" + id);
    }

    getNoticeData() {
        const { match } = this.props;

        util.asyncRequest({
            setLoading: this.setLoading,
            method: util.requestMethod.GET,
            url : url.boardPath.ajax + '/' + match.params.id,
            success: (result) => {
                const { NoticeAction } = this.props;
                NoticeAction.setBoard(result);
                NoticeAction.setComments(result.comments);
                NoticeAction.setFiles(result.files);

                this.boardBody.current.setContentToViewer(result.content);

                let buttonList = [
                    { color: 'blue', label: '목록으로', onClick: this.boardNoticeList }
                ];
                // if (
                //     controlData.config.id === result.data.board.user_id
                //     || controlData.config.auth_id === 1
                // ) {
                //     buttonList.push({ color: 'orange', label: '수정', onClick: this.boardNoticeModify });
                // }
                NoticeAction.setButtonList(buttonList);
            }
        });
    }

    downloadFile(fileId) {
        const { match } = this.props;

        util.asyncRequest({
            setLoading: this.setLoading,
            method: util.requestMethod.GET,
            url : url.boardPath.ajax + '/' + match.params.id + '/file/' + fileId,
            success: (result) => {
                const file = result;

                const fileDownloadUrl = file.path + file.fileName;
                const fileName = file.clientFileName;

                util.fileDownload(fileDownloadUrl, fileName);
            }
        });
    }

    registerComment(value) {
        const { id } = this.props;

        // if (! confirm("댓글을 작성하시겠습니까?")) return false;

        util.asyncRequest({
            setLoading: this.setLoading,
            url : url.boardPath.inAjax + 'register_notice_comment/' + id,
            data: {
                content: value,
            },
            success: (result) => {
                alert("댓글이 등록되었습니다.");

                const { NoticeAction } = this.props;
                NoticeAction.setComments(result.data.comment_data);

                this.commentComponent.current.commentCancel();
            },
        });
    }

    removeComment(commentId) {
        const { id } = this.props;

        // if (! confirm("댓글을 삭제하시겠습니까?")) return false;

        util.asyncRequest({
            setLoading: this.setLoading,
            url : url.boardPath.inAjax + 'remove_notice_comment/' + id + "/" + commentId,
            success: (result) => {
                alert("댓글이 삭제되었습니다.");

                const { NoticeAction } = this.props;
                NoticeAction.setComments(result.data.comment_data);

                this.commentComponent.current.handleCloseCommentMenu();
            },
        });
    }

    modifyComment(commentId, content) {
        const { id } = this.props;

        // if (! confirm('댓글을 수정하시겠습니까?')) return false;

        util.asyncRequest({
            etLoading: this.setLoading,
            url : url.boardPath.inAjax + 'modify_notice_comment/' + id + "/" + commentId,
            data: {
                content: content,
            },
            success: (result) => {
                alert("댓글이 수정되었습니다.");

                const { NoticeAction } = this.props;
                NoticeAction.setComments(result.data.comment_data);

                this.commentComponent.current.commentModifyCancel();
            }
        });
    }

    render () {
        const { loading } = this.state;

        const { board, comments, files, buttonList } = this.props;
        const { downloadFile, registerComment, removeComment, modifyComment } = this;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <PageTitle
                    type={"normal"}
                    title={"공지사항"}
                    navigate={["Midas-Yoon", "Board", "Notice"]}
                />
                <Container>
                    <BoardHeader
                        title={board.title}
                        userNickname={board.user.nickname}
                        createdAt={board.createdAt}
                    />
                    <BoardBody
                        ref={this.boardBody}
                        content={board.content}
                        files={files}
                        downloadFile={downloadFile}
                    />
                    <Divider/>
                    <ButtonGroup buttonList={buttonList} align="right"/>
                    <BoardComment
                        ref={this.commentComponent}
                        comments={comments}
                        registerAction={registerComment}
                        removeAction={removeComment}
                        modifyAction={modifyComment}
                    />
                </Container>
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        board: state.notice.get('board'),
        comments: state.notice.get('comments'),
        files: state.notice.get('files').toJS(),
        buttonList: state.notice.get('buttonList'),
    }),
    (dispatch) => ({
        NoticeAction: bindActionCreators(noticeAction, dispatch),
    })
)(NoticeViewContainer);
