import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import SearchInput from './searchInput.jsx';
import SearchSelect from './searchSelect.jsx';
import SearchRadio from './searchRadio.jsx';

import SingleButton from '../../components/button/singleButton.jsx';

import * as style from '../../common/globalStyle.js';

const useStyles = (theme) => ({
    root: {
        marginBottom: 16,
    },
    tableHeader: {
        width: "35%",
        height: 44,
        backgroundColor: style.searchTableHeaderColor,
        borderBottom: "none",
        fontWeight: "bold",
    },
    tableBody: {
        width: "65%",
        height: 44,
        borderBottom: "none",
    },
    searchButton: {
        textAlign: 'right',
    },
});

class Search extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.searchItems !== nextProps.searchItems
        );
    }

    render () {
        const { classes } = this.props;
        const { isModal, searchItems, setValue, searchButton, searchAction } = this.props;

        return (
            <Grid container spacing={0} className={classes.root}>
                {
                    searchItems.map((item, index) => {
                        let searchElement;
                        switch (item.type) {
                            case 'input' :
                                searchElement = 
                                    <SearchInput
                                        id={item.id}
                                        setValue={setValue}
                                        defaultValue={item.defaultValue}
                                        placeholder={item.placeholder}
                                        searchAction={searchAction}
                                    />
                                break;
                            case 'select' :
                                searchElement = 
                                    <SearchSelect
                                        id={item.id}
                                        setValue={setValue}
                                        defaultValue={item.defaultValue}
                                        itemList={item.itemList}
                                        disabled={item.disabled}
                                    />
                                break;
                            case 'radio':
                                searchElement = 
                                    <SearchRadio
                                        id={item.id}
                                        setValue={setValue}
                                        defaultValue={item.defaultValue}
                                        itemList={item.itemList}
                                        disabled={item.disabled}
                                    />
                                break;
                        }

                        return (
                            <Grid item key={index} xs={12} sm={isModal ? 12 : 6}>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tableHeader}>
                                                {item.label}
                                            </TableCell>                                            
                                            <TableCell className={classes.tableBody}>
                                                {
                                                    searchButton && index+1 === searchItems.length ?
                                                        <Grid container spacing={0}>
                                                            <Grid item xs={9}>
                                                                {searchElement}
                                                            </Grid>
                                                            <Grid item xs={3} className={classes.searchButton}>
                                                                <SingleButton
                                                                    label="검색"
                                                                    color="indigo"
                                                                    onClickEvent={searchAction}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    : searchElement
                                                }
                                                </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }
}

Search.defaultProps = {
    isModal: false,
    searchItems: [],
    setValue: function () {},
    searchAction: function () {},
    searchButton: true,
}

export default withStyles(useStyles)(Search);