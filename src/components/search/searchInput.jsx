import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = theme => ({
    input: {
        width: '100%',
    },
});

class SearchBasicInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.defaultValue !== nextProps.defaultValue;
    }

    handleChange(event) {
        const { setValue, id } = this.props;

        let value = event.target.value;
        setValue(id, value);
    }

    handleKeyDown(event) {
        const { searchAction } = this.props;

        if (event.key === 'Enter') {
            searchAction();
        }
    }

    render () {
        const { classes } = this.props;
        const { defaultValue, placeholder, onClick, disabled } = this.props;
        const { handleChange, handleKeyDown } = this;

        return (
            <TextField
                size="small"
                value={defaultValue}
                className={classes.input}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                placeholder={placeholder}
            />
        )
    }
}

SearchBasicInput.defaultProps = {
    onClick: function () {},
    disabled: false,
    maxLength: 100,
}
export default withStyles(useStyles)(SearchBasicInput);