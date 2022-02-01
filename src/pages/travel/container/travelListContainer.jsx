import React, {Component} from "react";

import Container from '@material-ui/core/Container';
import Loading from '../../../components/loading/loading.jsx';
import PageTitle from '../../../components/title/pageTitle.jsx';
import Search from '../../../components/search/search.jsx';
import Grid from '@material-ui/core/Grid';
import GalleryListComponent from '../component/galleryListComponent.jsx';
import Pagination from '../../../components/table/pagination.jsx';
import ButtonGroup from '../../../components/button/buttonGroup.jsx';

import * as url from '../../../common/url.js'
import * as util from '../../../common/util.js'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as galleryAction from '../store/modules/gallery.js';

class GalleryListContainer extends Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.getGalleryList = this.getGalleryList.bind(this);
        this.searchAction = this.searchAction.bind(this);
        this.setValue = this.setValue.bind(this);
        this.movePage = this.movePage.bind(this);
        this.galleryListMap = this.galleryListMap.bind(this);
        this.galleryRegister = this.galleryRegister.bind(this);

        this.state = {
            loading: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.props.buttonList !== nextProps.buttonList
            || this.props.searchItems !== nextProps.searchItems
            || this.props.page !== nextProps.page
            || this.props.galleryList !== nextProps.galleryList
            || this.props.galleryPaginate !== nextProps.galleryPaginate
        );
    }

    componentDidMount() {
        this.getGalleryList();

        let buttonList = [
            { color: 'green', label: '갤러리 지도로 보기', onClick: this.galleryListMap },
        ];
        // if (controlData.config.id) {
        //     buttonList.push({ color: 'orange', label: '여행 사진 등록', onClick: this.galleryRegister })
        // }

        const { GalleryAction } = this.props;
        GalleryAction.setButtonList(buttonList);
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    getGalleryList() {
        const { inputTitle, inputPlaceName, inputAddress, inputNickname, page, max } = this.props;

        util.asyncRequest({
            setLoading: this.setLoading,
            method: util.requestMethod.GET,
            url : url.travelPath.ajax,
            data: {
                title: inputTitle,
                placeName: inputPlaceName,
                address: inputAddress,
                nickname: inputNickname,
                page: page,
                size: max,
            },
            success: (result) => {
                const { GalleryAction } = this.props;
                GalleryAction.setGalleryList(result.content);
                GalleryAction.setGalleryPaginate(util.makePaginate(result));
            }
        });
    }

    setValue(id, value) {
        const { GalleryAction } = this.props;

        switch (id) {
            case "inputTitle":
                GalleryAction.setInputTitle(value);
                break;
            case "inputPlaceName":
                GalleryAction.setInputPlaceName(value);
                break;
            case "inputAddress":
                GalleryAction.setInputAddress(value);
                break;
            case "inputNickname":
                GalleryAction.setInputNickname(value);
                break;
        }
    }

    async searchAction() {
        const { GalleryAction } = this.props;
        await GalleryAction.setPage(1);

        this.getGalleryList();
    }

    async movePage(value) {
        const { GalleryAction } = this.props;
        await GalleryAction.setPage(value);

        this.getGalleryList();
    }

    galleryRegister() {
        util.locationHref(url.travelPath.inPage + "galleryRegister");
    }

    galleryListMap() {
        const { history } = this.props;
        util.locationHref(history, url.travelPath.page + "/map");
    }

    render () {
        const { loading } = this.state;

        const { searchItems, galleryList, buttonList } = this.props;
        const { galleryPaginate } = this.props;
        const { searchAction, setValue, movePage } = this;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <PageTitle
                    type={"normal"}
                    title={"여행 사진 갤러리"}
                    navigate={["Midas-Yoon", "Travel", "Gallery"]}
                />
                <Container>
                    <Search
                        searchItems={searchItems}
                        setValue={setValue}
                        searchAction={searchAction}
                        searchButton={true}
                    />
                    <Grid container spacing={3}>
                        {
                            galleryList.map((item, index) => (
                                <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                                    <GalleryListComponent
                                        key={index}
                                        galleryInfo={item}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Pagination
                        paginate={galleryPaginate}
                        handleChangePage={movePage}
                    />
                    <ButtonGroup buttonList={buttonList} align="right"/>
                </Container>
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        searchItems: state.gallery.get('searchItems').toJS(),

        inputTitle: state.gallery.get('inputTitle'),
        inputPlaceName: state.gallery.get('inputPlaceName'),
        inputAddress: state.gallery.get('inputAddress'),
        inputNickname: state.gallery.get('inputNickname'),

        page: state.gallery.get('page'),
        max: state.gallery.get('max'),

        galleryList: state.gallery.get('galleryList'),
        galleryPaginate: state.gallery.get('galleryPaginate'),

        buttonList: state.gallery.get('buttonList'),
    }),
    (dispatch) => ({
        GalleryAction: bindActionCreators(galleryAction, dispatch),
    })
)(GalleryListContainer);
