import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import ModalTemplate from '../modal/modalTemplate.jsx';
import Loading from '../loading/loading.jsx';

import * as util from '../../common/util.js';
import * as url from '../../common/url.js';

const useStyles = (theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    bottomNavigation: {
        marginTop: theme.spacing(2)
    }
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangePw = this.handleChangePw.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.loginAction = this.loginAction.bind(this);
        this.validate = this.validate.bind(this);

        this.memberRegister = this.memberRegister.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            loading: false,
            loginId: '',
            loginPw: '',
            buttonList: [
                { color: 'lightGreen', label: '로그인', onClick: this.loginAction },
                { color: 'amber', label: '닫기', onClick: this.handleClose },
            ],
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.open !== nextProps.open
            || this.state.loading !== nextState.loading
            || this.state.loginId !== nextState.loginId
            || this.state.loginPw !== nextState.loginPw
        );
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    handleChangeId(event) {
        this.setState({ loginId: event.target.value });
    }

    handleChangePw(event) {
        this.setState({ loginPw: event.target.value });
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.loginAction();
        }
    }

    loginAction() {
        const { loginId, loginPw } = this.state;
        const { handleClose } = this.props;

        if (! this.validate()) return false;

        util.asyncRequest({
            setLoading: this.setLoading,
            url : url.memberPath.ajax + 'login',
            data: {
                id: loginId,
                password: loginPw,
            },
            success: (result) => {
                if (result.data.error_code == 0) {
                    handleClose();
                    // location.reload();
                }
            }
        });
    }

    validate() {
        const { loginId, loginPw } = this.state;

        let err_msg = "";

        if (! loginId) {
            err_msg = "아이디를 입력해 주세요!";
        } else if (! loginPw) {
            err_msg = "패스워드를 입력해 주세요!";
        }

        if (err_msg) {
            alert(err_msg);
            return false;
        }

        return true;
    }

    memberRegister() {
        util.locationHref(url.memberPath.page + "register");
    }

    handleClose() {
        const { handleClose } = this.props;
        this.setState({
            loginId: '',
            loginPw: '',
        });
        handleClose();
    }

    render () {
        const { classes } = this.props;
        const { open } = this.props;
        const { loginId, loginPw, buttonList, loading } = this.state;
        const { handleChangeId, handleChangePw, handleKeyDown } = this;
        const { memberRegister } = this;
        const { handleClose } = this;

        return (
            <ModalTemplate
                handleClose={handleClose}
                open={open}
                modalTitle={"로그인"}
                maxWidth={"xs"}
                buttonList={buttonList}
            >
                <Loading loading={loading}/>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item xs={12}>
                        <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" justify="center">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField 
                                        fullWidth
                                        label="아이디"
                                        value={loginId}
                                        onChange={handleChangeId}
                                        onKeyDown={handleKeyDown}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" justify="center">
                                <Grid item>
                                    <VpnKeyIcon />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        label="패스워드"
                                        value={loginPw}
                                        onChange={handleChangePw}
                                        onKeyDown={handleKeyDown}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                <BottomNavigation
                    showLabels
                    className={classes.bottomNavigation}
                >
                    <BottomNavigationAction label="회원가입" icon={<RestoreIcon />} onClick={memberRegister} />
                    <BottomNavigationAction label="아이디찾기(X)" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="비번찾기(X)" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </ModalTemplate>
        );
    }
}

export default withStyles(useStyles)(Login);
