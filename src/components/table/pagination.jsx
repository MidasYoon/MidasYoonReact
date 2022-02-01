import React, {Component} from "react";
import { withStyles, createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Hidden from '@material-ui/core/Hidden';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = (theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            margin: "auto"
        },
        display: "flex",
    },
});

const noneShadow = [
    "none","none","none","none","none","none","none","none","none","none",
    "none","none","none","none","none","none","none","none","none","none",
    "none","none","none","none","none",
];

const defaultTheme = createTheme({
    shadows: noneShadow,
    shape: {
        borderRadius: 0
    },
    typography: {
        fontFamily: 'namsan',
    },
});

class TablePagination extends Component {
    constructor(props) {
        super(props);

        this.handleChangePageWeb = this.handleChangePageWeb.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.total !== nextProps.total
            || this.props.paginate !== nextProps.paginate
        );
    }

    handleChangePageWeb(value) {
        if (! value) return;

        const { handleChangePage } = this.props;
        handleChangePage(value);
    }

    render () {
        const { classes } = this.props;
        const { handleChangePageWeb } = this;
        const { paginate, showFirstButton, showLastButton, showPrevButton, showNextButton } = this.props;

        return (
            <div className={classes.root}>
                <Hidden smDown implementation="css">
                    <ThemeProvider theme={defaultTheme}>
                        <ButtonGroup size="small" color="primary">
                            {
                                paginate.map((item, index) => {
                                    if (item.label === "f") {
                                        if (showFirstButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <FirstPageIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "p") {
                                        if (showPrevButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <NavigateBeforeIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "n") {
                                        if (showNextButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <NavigateNextIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "l") {
                                        if (showLastButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <LastPageIcon/>
                                                </Button>
                                            )
                                        }
                                    } else {
                                        return <Button key={index} variant={item.active ? "contained" : "outlined"} onClick={() => {handleChangePageWeb(item.href)}}>{item.label}</Button>
                                    }
                                })
                            }
                        </ButtonGroup>
                    </ThemeProvider>
                </Hidden>
                <Hidden mdUp implementation="css">
                    <ThemeProvider theme={defaultTheme}>
                        <ButtonGroup size="small" color="primary">
                            {
                                paginate.map((item, index) => {
                                    if (index > 6) return null;

                                    if (item.label === "f") {
                                        if (showFirstButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <FirstPageIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "p") {
                                        if (showPrevButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <NavigateBeforeIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "n") {
                                        if (showNextButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <NavigateNextIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "l") {
                                        if (showLastButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <LastPageIcon/>
                                                </Button>
                                            )
                                        }
                                    } else {
                                        return <Button key={index} variant={item.active ? "contained" : "outlined"} onClick={() => {handleChangePageWeb(item.href)}}>{item.label}</Button>
                                    }
                                })
                            }
                        </ButtonGroup>
                        <br/>
                        <ButtonGroup size="small" color="primary">
                            {
                                paginate.map((item, index) => {
                                    if (index <= 6) return null;

                                    if (item.label === "f") {
                                        if (showFirstButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <FirstPageIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "p") {
                                        if (showPrevButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <NavigateBeforeIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "n") {
                                        if (showNextButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <NavigateNextIcon/>
                                                </Button>
                                            )
                                        }
                                    } else if (item.label === "l") {
                                        if (showLastButton) {
                                            return (
                                                <Button key={index} variant="outlined" onClick={() => {handleChangePageWeb(item.href)}}>
                                                    <LastPageIcon/>
                                                </Button>
                                            )
                                        }
                                    } else {
                                        return <Button key={index} variant={item.active ? "contained" : "outlined"} onClick={() => {handleChangePageWeb(item.href)}}>{item.label}</Button>
                                    }
                                })
                            }
                        </ButtonGroup>
                    </ThemeProvider>
                </Hidden>
            </div>
        )
    }
}

TablePagination.defaultProps = {
    paginate: [],
    handleChangePage: function () { },
    showFirstButton: true,
    showLastButton: true,
    showPrevButton: true,
    showNextButton: true,
}

export default withStyles(useStyles)(TablePagination);