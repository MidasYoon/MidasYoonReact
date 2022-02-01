import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';

import * as util from '../../../common/util.js';
import * as style from '../../../common/globalStyle.js';
import * as url from '../../../common/url.js';

const useStyles = (theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
    thumbnail: {
        position: "relative",
        paddingTop: "100%", /* 1:1 ratio */
        overflow: "hidden",
        marginBottom: theme.spacing(1),
    },
    centered: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // -webkit-transform: "translate(50%,50%)",
        // -ms-transform: "translate(50%,50%)",
        transform: "translate(50%,50%)",
    },
    img: {
        position: "absolute",
        top: 0,
        left: 0,
        maxWidth: "100%",
        height: "100%",
        objectFit: "cover",
        //  -webkit-transform: translate(-50%,-50%);
        //   -ms-transform: translate(-50%,-50%);
        transform: "translate(-50%,-50%)",
        cursor: "pointer",
    },
    title: {
        fontSize: "16px",
        fontWeight: "bold",
        margin: 0,
        textDecoration: 'none',
        "&:hover": {
            color: style.linkHoverColor,
            textDecoration: 'none',
        }
    },
    nickName: {
        margin: 0,
        color: "#666",
    },
    etc: {
        color: "#666",
        fontSize: "14px",
    },
});

class GalleryListComponent extends Component {
    constructor(props) {
        super(props);

        this.galleryView = this.galleryView.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.galleryInfo !== nextProps.galleryInfo
        );
    }

    galleryView(id) {
        util.locationHref(url.travelPath.page + "galleryView/" + id);
    }

    render () {
        const { classes } = this.props;
        const { galleryInfo } = this.props;
        const { galleryView } = this;

        return (
            <div className={classes.root}>
                <Link href={url.travelPath.page + "/" + galleryInfo.id} color="inherit" className={classes.title}>
                    <div className={classes.thumbnail}>
                        <div className={classes.centered}>
                            <img
                                src={galleryInfo.thumbnail}
                                alt={galleryInfo.placeName}
                                className={classes.img}
                                onClick={() => galleryView(galleryInfo.id)}
                            />
                        </div>
                    </div>

                    {galleryInfo.title}
                </Link>
                <p className={classes.nickName}>{galleryInfo.placeName}</p>
                <span className={classes.etc}>
                    {galleryInfo.nickname}•{util.formatDate(galleryInfo.createdAt)}
                    {/* • 👍 3 */}
                </span>
            </div>
        )
    }
}

GalleryListComponent.defaultProps = {
    galleryInfo: {},
}

export default withStyles(useStyles)(GalleryListComponent);
