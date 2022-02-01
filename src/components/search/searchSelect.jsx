import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = theme => ({
    select: {
        width: "100%",
    },
});

class SearchSelect extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.defaultValue !== nextProps.defaultValue
            || this.props.itemList !== nextProps.itemList
        )
    }

    handleChange(event) {
        const { setValue, id } = this.props;
        let value = event.target.value;     // itemList 배열 내 한 객체의 value 속성
        setValue(id, value);
    }

    render () {
        const { classes } = this.props;
        const { defaultValue, itemList, disabled } = this.props;
        const { handleChange } = this;

        return (
            <Select 
                className={classes.select}
                value={defaultValue}
                onChange={handleChange}
                displayEmpty
                disabled={disabled}
            >
                {
                    itemList.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))
                }
            </Select>
        )
    }
}

SearchSelect.defaultProps = {
    id: "", 
    defaultValue: "",
    itemList: [],
    disabled: false,
    setValue: function () { }, 
}

export default withStyles(useStyles)(SearchSelect);