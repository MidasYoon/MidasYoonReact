/* global daum */
import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import PageTitle from '../../../components/title/pageTitle.jsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import * as url from '../../../common/url.js'
import * as util from '../../../common/util.js'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as galleryAction from '../store/modules/gallery.js';

const useStyles = (theme) => ({
    map: {
        width: "100%",
        height: "calc(100vh - 165px)",
        // height: "calc(100vh - 165px - 160px)",
        // border: "1px solid #000",
        marginTop: "-20px",
    },
    list: {
        width: 300,
        maxWidth: 300,
        paddingTop: 0,
    },
    listItem: {
        paddingTop: 4,
        paddingBottom: 4,
    },
    inline: {
        display: 'inline',
    },
});

class GalleryMapContainer extends Component {
    constructor(props) {
        super(props);

        this.initMap = this.initMap.bind(this);
        this.displayMap = this.displayMap.bind(this);
        this.setMarker = this.setMarker.bind(this);
        this.addMapListener = this.addMapListener.bind(this);
        this.viewPointPlaceList = this.viewPointPlaceList.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);

        this.state = {
            placeName: "",
            drawerOpen: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.galleryList !== nextProps.galleryList
            || this.props.map !== nextProps.map
            || this.props.clusterer !== nextProps.clusterer
            || this.props.page !== nextProps.page
            || this.state.drawerOpen !== nextState.drawerOpen
            || this.state.placeName !== nextState.placeName
        );
    }

    componentDidMount() {
        this.initMap();
    }

    async initMap() {
        let container = document.getElementById('mapGallery');
        let options = {
            center: new daum.maps.LatLng(33.450701, 126.570667),
            level: 7
        };

        const { GalleryAction } = this.props;
        await GalleryAction.setMap(new daum.maps.Map(container, options))

        this.props.map.setCopyrightPosition(daum.maps.CopyrightPosition.BOTTOMRIGHT, true);

        let mapTypeControl = new daum.maps.MapTypeControl();    // ?????? ????????? ??????????????? ?????? ????????? ????????? ??? ?????? ???????????? ???????????? ??????
        this.props.map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

        let zoomControl = new daum.maps.ZoomControl();          // ?????? ?????? ????????? ????????? ??? ?????? ??? ???????????? ??????
        this.props.map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

        GalleryAction.setClusterer(new daum.maps.MarkerClusterer({
            map: this.props.map, // ???????????? ??????????????? ???????????? ????????? ?????? ??????
            averageCenter: true, // ??????????????? ????????? ???????????? ?????? ????????? ???????????? ?????? ????????? ??????
            minLevel: 5, // ???????????? ??? ?????? ?????? ??????
        }));

        this.addMapListener();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latLon = {
                    'lat' : position.coords.latitude,
                    'lon' : position.coords.longitude,
                }

                this.props.map.setCenter(new daum.maps.LatLng(latLon.lat, latLon.lon));
                this.displayMap(latLon, 7);
            });
        }
    }

    displayMap(latLon, level) {
        util.asyncRequest({
            url : url.travelPath.ajax + '/map',
            method: util.requestMethod.GET,
            data: {
                latitude: latLon.lat,
                longitude: latLon.lon,
                dLat: util.levelToLatLng[level].lat,
                dLon: util.levelToLatLng[level].lon,
            },
            success: (result) => {
                const { GalleryAction } = this.props;
                GalleryAction.setGalleryList(result);
                this.setMarker(result);
            }
        });
    }

    setMarker(listData) {
        let markers = listData.map((position, i) => {
            let marker = new daum.maps.Marker({
                position : new daum.maps.LatLng(position.latitude, position.longitude)
            });

            daum.maps.event.addListener(marker, 'click', () => {
                this.viewPointPlaceList(listData[i].placeName);
            });

            return marker;
        });

        this.props.clusterer.clear();
        this.props.clusterer.addMarkers(markers);
    }

    addMapListener() {
        daum.maps.event.addListener(this.props.map, 'dragend', () => {
            let latlng = this.props.map.getCenter();
            let level = this.props.map.getLevel();

            this.displayMap({
                'lat' : latlng.getLat(),
                'lon' : latlng.getLng()
            }, level);
        });

        daum.maps.event.addListener(this.props.map, 'zoom_changed', () => {
            let latlng = this.props.map.getCenter();
            let level = this.props.map.getLevel();

            this.displayMap({
                'lat' : latlng.getLat(),
                'lon' : latlng.getLng()
            }, level);
        });
    }

    viewPointPlaceList(placeName) {
        const { page } = this.props;

        util.asyncRequest({
            url : url.travelPath.ajax,
            method: util.requestMethod.GET,
            data: {
                placeName: placeName,
                page: page,
                size: 10,
            },
            success: (result) => {
                const { GalleryAction } = this.props;
                GalleryAction.setGalleryPointList(result.content);
                GalleryAction.setGalleryPointTotal(result.totalElements);
                GalleryAction.setGalleryPointPaginate(util.makePaginate(result));

                this.toggleDrawer(true);
                this.setState({ placeName: placeName });
            }
        });
    }

    toggleDrawer(open) {
        this.setState({ drawerOpen: open });
    }

    render () {
        const { classes } = this.props;

        const { toggleDrawer } = this;
        const { drawerOpen, placeName } = this.state;
        const { galleryPointList, galleryPointPaginate, galleryPointTotal } =  this.props;

        return (
            <React.Fragment>
                <PageTitle
                    type={"normal"}
                    title={"?????? ?????? ?????????"}
                    navigate={["Midas-Yoon", "Travel", "Gallery"]}
                />
                <div id="mapGallery" className={classes.map}/>
                <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                    <List
                        className={classes.list}
                        subheader={
                            <ListSubheader component="div" color="inherit">{placeName}</ListSubheader>
                        }
                    >
                        {
                            galleryPointList.map((item, index) => (
                                <Link key={index} href={url.travelPath.page + "/" + item.id} color="inherit" style={{ textDecoration: 'none' }}>
                                    <ListItem alignItems="flex-start" className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar alt={item.title} src={item.thumbnail}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={item.nickname + "???" + util.formatDate(item.createdAt)}
                                        />
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </List>
                </Drawer>
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        galleryList: state.gallery.get('galleryList'),

        map: state.gallery.get('map'),
        clusterer: state.gallery.get('clusterer'),

        page: state.gallery.get('page'),
        max: state.gallery.get('max'),

        galleryPointList: state.gallery.get('galleryPointList'),
        galleryPointPaginate: state.gallery.get('galleryPointPaginate'),
        galleryPointTotal: state.gallery.get('galleryPointTotal'),
    }),
    (dispatch) => ({
        GalleryAction: bindActionCreators(galleryAction, dispatch),
    })
)(withStyles(useStyles)(GalleryMapContainer));
