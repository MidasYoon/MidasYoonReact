import React, {Component} from "react";
import Container from '@material-ui/core/Container';

import Loading from '../../../../components/loading/loading.jsx';
import PageTitle from '../../../../components/title/pageTitle.jsx';
import Search from '../../../../components/search/search.jsx';
import TableListBoard from '../../../../components/table/tableListBoard.jsx';
import Pagination from '../../../../components/table/pagination.jsx';

import * as util from '../../../../common/util.js';
import * as url from '../../../../common/url.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noticeAction from '../../store/modules/notice.js';

class NoticeListContainer extends Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.setValue = this.setValue.bind(this);
        this.getNoticeList = this.getNoticeList.bind(this);

        this.searchAction = this.searchAction.bind(this);
        this.movePage = this.movePage.bind(this);

        this.state = {
            loading: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.props.searchItems !== nextProps.searchItems
            || this.props.inputTitle !== nextProps.inputTitle
            || this.props.page !== nextProps.page
            || this.props.max !== nextProps.max
            || this.props.listTotal !== nextProps.listTotal
            || this.props.listRow !== nextProps.listRow
            || this.props.listPaginate !== nextProps.listPaginate
        );
    }

    componentDidMount() {
        this.getNoticeList();
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    setValue(id, value) {
        const { NoticeAction } = this.props;

        switch (id) {
            case "inputTitle":
                NoticeAction.setInputTitle(value);
                break;
        }
    }

    getNoticeList() {
        const { inputTitle, page, max } = this.props;

        util.asyncRequest({
            setLoading: this.setLoading,
            method: util.requestMethod.GET,
            url : url.boardPath.ajax,
            data: {
                page: page,
                size: max,
                title: inputTitle,
            },
            success: (result) => {
                const { NoticeAction } = this.props;
                NoticeAction.setNoticeList(result.content);
                NoticeAction.setNoticeTotal(result.totalElements);
                NoticeAction.setNoticePaginate(util.makePaginate(result));
            }
        });
    }

    async searchAction() {
        const { NoticeAction } = this.props;
        await NoticeAction.setPage(1);

        this.getNoticeList();
    }

    async movePage(value) {
        const { NoticeAction } = this.props;
        await NoticeAction.setPage(value);

        this.getNoticeList();
    }

    render () {
        const { loading } = this.state;

        const { searchItems, listTotal, listRow, listPaginate } = this.props;
        const { setValue, searchAction, movePage } = this;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <PageTitle
                    type={"normal"}
                    title={"공지사항"}
                    navigate={["Midas-Yoon", "Board", "Notice"]}
                />
                <Container>
                    <Search
                        searchItems={searchItems}
                        setValue={setValue}
                        searchAction={searchAction}
                        searchButton={true}
                    />
                    <TableListBoard
                        listTotal={listTotal}
                        listRow={listRow}
                        linkUrl={url.boardPath.page + "/"}
                    />
                    <Pagination
                        paginate={listPaginate}
                        handleChangePage={movePage}
                    />
                </Container>
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        searchItems: state.notice.get('searchItems').toJS(),

        inputTitle: state.notice.get('inputTitle'),

        page: state.notice.get('page'),
        max: state.notice.get('max'),

        listTotal: state.notice.get('listTotal'),
        listRow: state.notice.get('listRow'),
        listPaginate: state.notice.get('listPaginate'),
    }),
    (dispatch) => ({
        NoticeAction: bindActionCreators(noticeAction, dispatch),
    })
)(NoticeListContainer);