import React, { Component } from 'react';
import {createTheme, withStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    buttonGroupWrapper:{
        width: '100%',
        textAlign: 'center',
    },
    alignLeft: {
        textAlign: 'left',
    },
    alignRight: {
        textAlign: 'right',
    },
    alignCenter: {
        textAlign: 'center',
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

function colorTheme(color, outerTheme) {
    let theme = {
        ...outerTheme,
    };

    switch (color) {
        case 'amber':
            theme.palette = { primary: amber };
            break;
        case 'blue':
            theme.palette = { primary: blue };
            break;
        case 'blueGrey':
            theme.palette = { primary: blueGrey };
            break;
        case 'brown':
            theme.palette = { primary: brown };
            break;
        case 'common':
            theme.palette = { primary: common.white };
            break;
        case 'cyan':
            theme.palette = { primary: cyan };
            break;
        case 'deepOrange':
            theme.palette = { primary: deepOrange };
            break;
        case 'deepPurple':
            theme.palette = { primary: deepPurple };
            break;
        case 'green':
            theme.palette = { primary: green };
            break;
        case 'grey':
            theme.palette = { primary: grey };
            break;
        case 'indigo':
            theme.palette = { primary: indigo };
            break;
        case 'lightBlue':
            theme.palette = { primary: lightBlue };
            break;
        case 'lightGreen':
            theme.palette = { primary: lightGreen };
            break;
        case 'lime':
            theme.palette = { primary: lime };
            break;
        case 'orange':
            theme.palette = { primary: orange };
            break;
        case 'pink':
            theme.palette = { primary: pink };
            break;
        case 'purple':
            theme.palette = { primary: purple };
            break;
        case 'red':
            theme.palette = { primary: red };
            break;
        case 'teal':
            theme.palette = { primary: teal };
            break;
        case 'yellow':
            theme.palette = { primary: yellow };
            break;
    }

    return createTheme(theme);
}

class ButtonGroup extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.buttonList !== nextProps.buttonList;
    }

    render () {
        const { classes } = this.props;
        const { buttonList, align } = this.props;

        return (
            <div className={
                clsx(
                    classes.buttonGroupWrapper,
                    align === "right" ? classes.alignRight : (align === "center" ? classes.alignCenter : classes.alignLeft)
                )
            }>
                <ThemeProvider theme={defaultTheme}>
                    {
                        buttonList.map((buttonItem, index) => {
                            return (
                                <ThemeProvider key={index} theme={outerTheme => colorTheme(buttonItem.color, outerTheme)}>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={buttonItem.onClick}>
                                        {buttonItem.label}
                                    </Button>
                                </ThemeProvider>
                            )
                        })
                    }
                </ThemeProvider>
            </div>
        );
    }
}

ButtonGroup.defaultProps = {
    buttonList: [],
    align: "right", // left, right, center
}

export default withStyles(useStyles)(ButtonGroup);
