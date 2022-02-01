import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class Loading extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.loading !== nextProps.loading
        )
    }

    render () {
        const { classes } = this.props;
        const { loading } = this.props;

        return (
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
}

Loading.defaultProps = {
    loading: false,
}

export default withStyles(useStyles)(Loading);
