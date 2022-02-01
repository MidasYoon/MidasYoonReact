import React, { Component } from 'react';
import { createTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@material-ui/core/colors';

const useStyles = theme => ({
    topMargin: {
        marginTop: theme.spacing(1),
    },
    topLeftMargin: {
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
    },
    backBottomMargin: {
        marginBottom: theme.spacing(-1),
    },
    leftMargin: {
        marginLeft: theme.spacing(1),
    },
    rightMargin: {
        marginRight: theme.spacing(1),
    },
    bothMargin: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    noneMargin: {
        margin: 0,
    }
});

function buttonMargin(classes, margin) {
    switch (margin) {
        case "top" :
            return classes.topMargin;
         case "topLeft" :
            return classes.topLeftMargin;
        case "backBottom" :
            return classes.backBottomMargin;
        case "left" :
            return classes.leftMargin;
        case "right" :
            return classes.rightMargin;
        case "both" :
            return classes.bothMargin;
        case "none" :
            return classes.noneMargin;
    }
}

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


class SingleButton extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { classes } = this.props;
        const { label, variantProp, fullWidth, color, margin, onClickEvent } = this.props;

        return (
            <ThemeProvider theme={defaultTheme}>
                <ThemeProvider theme={outerTheme => colorTheme(color, outerTheme)}>
                    <Button variant={variantProp} color="primary" className={buttonMargin(classes, margin)} fullWidth={fullWidth} onClick={onClickEvent}>
                        {label}
                    </Button>
                </ThemeProvider>
            </ThemeProvider>
        );
    }
}

SingleButton.defaultProps = {
    label: '',
    color: 'blue',
    variantProp: "contained",   // contained, outlined, text
    fullWidth: false,
    margin: 'left',     // left, right, both, none
    onClickEvent: function() {  },
};

export default withStyles(useStyles)(SingleButton);
