import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Loading from '../../../components/loading/loading.jsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';

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
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            width: '100%',
            height: '332px',
        },
        borderRadius: 0,
        border: "1px solid rgba(224, 224, 224, 1)",
    },
});

class TrackIndex extends Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);

        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            // || this.state.photoData !== nextState.photoData
        );
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    // getPhotoList() {
    //     util.asyncRequest({
    //         setLoading: this.setLoading,
    //         url : url.galleryPath.ajax + 'get_gallery_list',
    //         data: {
    //             page: 1,
    //             max: 6,
    //         },
    //         success: (result) => {
    //             this.setState({
    //                 photoData: result.data.place_list.data,
    //             })
    //         }
    //     });
    // }

    // galleryIndex() {
    //     util.locationHref("/gallery/index");
    // }

    render () {
        const { classes } = this.props;
        // const { galleryIndex } = this;

        const { loading } = this.state;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar variant="dense" className={classes.toolBar}>
                        <Typography className={classes.title}>최근 업로드 코스</Typography>
                        <IconButton /*onClick={galleryIndex}*/ className={classes.moreButton}>
                            <AddIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography>Under Development</Typography>
                    </Paper>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(TrackIndex);