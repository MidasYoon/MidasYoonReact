import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = theme => ({
    select: {
        width: "100%",
    },
});

class SearchRadio extends Component {
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
            <RadioGroup
                row
                className={classes.select}
                value={defaultValue}
                onChange={handleChange}
            >
                {
                    itemList.map((item, index) => (
                        <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} disabled={disabled}/>
                    ))
                }
            </RadioGroup>
        )
    }
}

SearchRadio.defaultProps = {
    id: "", 
    defaultValue: "",
    itemList: [],
    disabled: false,
    setValue: function () { }, 
}

export default withStyles(useStyles)(SearchRadio);