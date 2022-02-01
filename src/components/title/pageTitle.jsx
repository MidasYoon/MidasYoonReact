import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = (theme) => ({
    titleWrapper: { 
        padding:"15px",
        marginBottom: "20px",
        backgroundColor: "rgb(225,248,213)",
        width:"100%",
        display:"block",
    },
    adminTitleWrapper: {
        padding:"15px",
        marginBottom:"20px",
        backgroundColor:"rgb(172, 184, 252)",
        width:"100%",
        display:"block",
    },
    labTitleWrapper: {
        padding:"15px",
        marginBottom:"20px",
        backgroundColor:"rgb(255, 255, 0)",
        width:"100%",
        display:"block",
    },
    errorTitleWrapper: {
        padding:"15px",
        marginBottom:"20px",
        backgroundColor:"#EE7609",
        color: "#fff",
        width:"100%",
        display:"block",
    },
    pageTitle: {
        fontSize:"30px",
    },

});

class PageTitle extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render () {
        const { classes } = this.props;
        const { type, title, navigate } = this.props;

        return (
            <React.Fragment>
                {
                    (() => {
                        if (type === "index") {
                            return <div></div>
                        } else {
                            let titleClass;
                            switch (type) {
                                case "normal":
                                    titleClass = classes.titleWrapper;
                                    break;
                                case "admin":
                                    titleClass = classes.adminTitleWrapper;
                                    break;
                                case "lab":
                                    titleClass = classes.labTitleWrapper;
                                    break;
                                case "error":
                                    titleClass = classes.errorTitleWrapper;
                                    break;
                            }

                            return (
                                <div className={titleClass}>
                                    <Typography className={classes.pageTitle}>{title}</Typography>
                                    {
                                        navigate ? 
                                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                                                {
                                                    navigate.map((item, index) => {
                                                        if (index === navigate.length - 1)
                                                        return <Typography key={index} color="textPrimary">{item}</Typography>
                                                        else return <Typography key={index} color="inherit">{item}</Typography>
                                                    })
                                                }
                                            </Breadcrumbs>
                                        : null
                                    }
                                </div>
                            )
                        }
                    })()
                }
            </React.Fragment>
        )
    }
}

PageTitle.defaultProps = {
    type: "normal", // normal, admin, lab
    title: "제목 입력",
    navigate: null,
}

export default withStyles(useStyles)(PageTitle);