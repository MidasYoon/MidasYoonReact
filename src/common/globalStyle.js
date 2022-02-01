import { createTheme } from '@material-ui/core/styles';
import SeoulNamsanvert from '../fonts/SeoulNamsanvert.ttf';

export const drawerWidth= 240;
export const appBarColor = '#343a40';

export const menuBackground = 'ivory';
export const menuDivider = 'pink';
export const outerMenu = 'mistyrose';
export const outerMenuActive = 'violet';
export const nestedMenu = 'lightyellow';
export const nestedMenuActive = '#d8eefb';

export const memberPopperMenuActive = "#8cadcb";

export const modalTitleColor = '#00a2d1';
export const modalTitleFontColor = 'ivory';
export const modalCloseButtonColor = "#fff";

export const indexAppbarColor = "#4ea346";

export const linkHoverColor = "#007bff";
export const boardCommentCntColor = "dodgerblue";

export const searchTableHeaderColor = "#daf2f0";
export const formTableHeaderColor = "rgb(255, 244, 229)";

const namsan = {
    fontFamily: 'namsan',
    src: `
        url(${SeoulNamsanvert}) format('woff2')
    `,
};

export const seoulNamsan = createTheme({
    typography: {
        fontFamily: 'namsan',
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [namsan],
            },
        },
    },
    palette: {
        background: {
            default: "#fff"
        }
    }
});

export const trainTimeTableBgColor = {
    "KTX" : "#FBDBDC",
    "KTX-산천" : "#FBDBDC",
    "SRT" : "#A64761",
    "ITX-새" : "#B6D0F8",
    "ITX-새마을" : "#B6D0F8",
    "새마을호" : "#D8EEFB",
    "무궁화호" : "#FEFAEA",
    "누리로" : "#F4F199",
    "통근열차" : "#E1F8D5",
    "ITX-청춘" : "#EFD8EA",
};

export const trainTimeTablefontColor = {
    "KTX" : "#DA090B",
    "KTX-산천" : "#DA090B",
    "SRT" : "#5A2049",
    "ITX-새" : "#344F69",
    "ITX-새마을" : "#344F69",
    "새마을호" : "#3987D6",
    "무궁화호" : "#FF7800",
    "누리로" : "#878320",
    "통근열차" : "#78B51C",
    "ITX-청춘" : "#D888F6",
};