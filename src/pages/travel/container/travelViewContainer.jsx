import React, {Component} from "react";

import Container from '@material-ui/core/Container';
import Loading from '../../../components/loading/loading.jsx';
import PageTitle from '../../../components/title/pageTitle.jsx';
import BoardHeader from '../../../components/board/boardHeader.jsx';
import Link from '@material-ui/core/Link';
import ButtonGroup from '../../../components/button/buttonGroup.jsx';

import * as url from '../../../common/url.js'
import * as util from '../../../common/util.js'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as galleryAction from '../store/modules/gallery.js';

class GalleryViewContainer extends Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.getGalleryView = this.getGalleryView.bind(this);
        this.galleryList = this.galleryList.bind(this);
        this.galleryModify = this.galleryModify.bind(this);
        this.viewImagePopup = this.viewImagePopup.bind(this);

        this.state = {
            loading: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.props.buttonList !== nextProps.buttonList
        );
    }

    componentDidMount() {
        this.getGalleryView();
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    getGalleryView() {
        const { match } = this.props;

        util.asyncRequest({
            setLoading: this.setLoading,
            method: util.requestMethod.GET,
            url : url.travelPath.ajax + '/' + match.params.id,
            success: (result) => {
                let galleryData = result;

                const { GalleryAction } = this.props;
                GalleryAction.setGalleryDetail(galleryData);

                let buttonList = [
                    { color: 'blue', label: '목록으로', onClick: this.galleryList }
                ];
                // if (
                //     controlData.config.id === galleryData.user_id
                //     || controlData.config.auth_id === 1
                // ) {
                //     buttonList.push({ color: 'orange', label: '수정', onClick: this.galleryModify });
                // }
                GalleryAction.setButtonList(buttonList);
            }
        });
    }

    galleryList() {
        const { history } = this.props;
        util.locationHref(history, url.travelPath.page);
    }

    galleryModify() {
        const { id } = this.props;
        util.locationHref(url.travelPath.inPage + "galleryModify/" + id);
    }

    viewImagePopup(url) {
        const { placeName } = this.props;

        let image = new Image();
        image.src = url;

        let width = image.width;
        let height = image.height;

        window.open(url, placeName, `width=${width},height=${height},toolbars=no,location=no,status=no,scrollbars=no`)
    }

    render () {
        const { loading } = this.state;
        const { title, placeName, userNickname, createdAt, imageList, buttonList } = this.props;
        const { viewImagePopup } = this;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <PageTitle
                    type={"normal"}
                    title={"여행 사진 갤러리"}
                    navigate={["Midas-Yoon", "Travel", "Gallery"]}
                />
                <Container>
                    <BoardHeader
                        title={title}
                        subtitle={placeName}
                        userNickname={userNickname}
                        createdAt={createdAt}
                    />
                    {
                        imageList.map((item, index) => {
                            return (
                                <div key={index} style={{ width:"95%", marginLeft: "auto", marginRight: "auto", marginBottom: "32px", display: "block" }}>
                                    <Link onClick={() => viewImagePopup(item.path + item.fileName)}>
                                        <img
                                            width="100%"
                                            src={item.path + item.fileName}
                                            alt={placeName + (index + 1)}
                                            style={{cursor: "pointer"}}
                                        />
                                    </Link>
                                    {/* <span style={{wordBreak:"break-all"}}></span> */}
                                </div>
                            )
                        })
                    }
                    <ButtonGroup buttonList={buttonList} align="right"/>
                </Container>
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        title: state.gallery.get('title'),
        placeName: state.gallery.get('placeName'),
        userNickname: state.gallery.get('userNickname'),
        createdAt: state.gallery.get('createdAt'),
        imageList: state.gallery.get('imageList'),

        buttonList: state.gallery.get('buttonList'),
    }),
    (dispatch) => ({
        GalleryAction: bindActionCreators(galleryAction, dispatch),
    })
)(GalleryViewContainer);