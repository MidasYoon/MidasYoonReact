import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Loading from '../../../components/loading/loading.jsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/ImageList';
import GridListTile from '@material-ui/core/ImageListItem';
import GridListTileBar from '@material-ui/core/ImageListItemBar';

import * as style from '../../../common/globalStyle.js';
import * as util from '../../../common/util.js';
import * as url from '../../../common/url.js';
import Link from "@material-ui/core/Link";

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

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        borderRadius: 0,
        border: "1px solid rgba(224, 224, 224, 1)",
        boxShadow: 'none',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class GalleryIndex extends Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.getPhotoList = this.getPhotoList.bind(this);
        this.galleryDetail = this.galleryDetail.bind(this);

        this.state = {
            loading: false,
            photoData: [],
        }
    }

    componentDidMount() {
        this.getPhotoList();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.state.photoData !== nextState.photoData
        );
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    getPhotoList() {
        util.asyncRequest({
            setLoading: this.setLoading,
            method: util.requestMethod.GET,
            url : url.travelPath.ajax,
            data: {
                title: "",
                placeName: "",
                address: "",
                nickname: "",
                page: 1,
                size: 6,
            },
            success: (result) => {
                this.setState({
                    photoData: result.content,
                })
            }
        });
    }

    galleryDetail(id) {
        util.locationHref(url.travelPath.page + "galleryView/" + id);
    }

    render () {
        const { classes } = this.props;
        const { galleryDetail } = this;

        const { loading, photoData } = this.state;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar variant="dense" className={classes.toolBar}>
                        <Typography className={classes.title}>최근 등록된 사진</Typography>
                        <Link href={url.travelPath.page}>
                            <IconButton className={classes.moreButton}>
                                <AddIcon/>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
                <div className={classes.root} component={Paper}>
                    <GridList rowHeight={109}>
                        {photoData.map((tile) => (
                            <GridListTile key={tile.id}>
                                <img src={tile.thumbnail} alt={tile.placeName} style={{objectFit: "cover"}} />
                                <GridListTileBar
                                    title={tile.placeName}
                                    subtitle={<span>by {tile.nickname}</span>}
                                    style={{cursor: "pointer"}}
                                    onClick={() => galleryDetail(tile.id)}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(GalleryIndex);