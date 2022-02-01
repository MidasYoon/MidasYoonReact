import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import * as style from '../../common/globalStyle.js';
import ButtonGroup from '../button/buttonGroup.jsx';

const useStyles = (theme) => ({
    dialogTitle: {
        margin: 0,
        padding: theme.spacing(1.5),
        backgroundColor: style.modalTitleColor,
        color: style.modalTitleFontColor,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0.5),
        top: theme.spacing(0.5),
        color: style.modalCloseButtonColor,
    },
    dialogContent: {
        padding: theme.spacing(2),
        border: 'none',
    },
    dialogAction: {
        margin: 0,
        padding: theme.spacing(1),
    },
});

class ModalTemplate extends Component {
    render () {
        const { classes } = this.props;
        const { children } = this.props;
        const { handleClose } = this.props;
        const { open, modalTitle, maxWidth, buttonList } = this.props;

        return (
            <Dialog 
                onClose={handleClose} 
                open={open}
                maxWidth={maxWidth}
                fullWidth
                PaperProps={{
                    style: { borderRadius: 0 }
                }}
            >
                {
                    modalTitle ?
                        <MuiDialogTitle disableTypography className={classes.dialogTitle}>
                            <Typography variant="h6">{modalTitle}</Typography>
                            <IconButton className={classes.closeButton} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </MuiDialogTitle>
                    : null
                }
                <MuiDialogContent dividers className={classes.dialogContent}>
                    {children}
                </MuiDialogContent>
                {
                    buttonList ? (
                        <MuiDialogActions className={classes.dialogAction}>
                            <ButtonGroup buttonList={buttonList} />
                        </MuiDialogActions>
                    ) : null
                }                
            </Dialog>
        );
    }
}

export default withStyles(useStyles)(ModalTemplate);