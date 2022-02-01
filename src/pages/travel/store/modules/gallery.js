import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

// action types
const SET_PAGE = 'gallery/SET_PAGE';

const SET_INPUT_TITLE = 'gallery/SET_INPUT_TITLE';
const SET_INPUT_PLACENAME = 'gallery/SET_INPUT_PLACENAME';
const SET_INPUT_ADDRESS = 'gallery/SET_INPUT_ADDRESS';
const SET_INPUT_NICKNAME = 'gallery/SET_INPUT_NICKNAME';

const SET_GALLERY_LIST = 'gallery/SET_GALLERY_LIST';
const SET_GALLERY_PAGINATE = 'gallery/SET_GALLERY_PAGINATE';

const SET_GALLERY_POINT_LIST = 'gallery/SET_GALLERY_POINT_LIST';
const SET_GALLERY_POINT_PAGINATE = 'gallery/SET_GALLERY_POINT_PAGINATE';
const SET_GALLERY_POINT_TOTAL = 'gallery/SET_GALLERY_POINT_TOTAL';

const SET_GALLERY_DETAIL = 'gallery/SET_GALLERY_DETAIL';

const SET_BUTTON_LIST = 'gallery/SET_BUTTON_LIST';

const SET_TITLE = 'gallery/SET_TITLE';
const SET_PLACE_INFO = 'gallery/SET_PLACE_INFO';
const SET_THUMBNAIL = 'gallery/SET_THUMBNAIL';
const SET_IMAGE_LIST = 'gallery/SET_IMAGE_LIST';

const SET_MAP = 'gallery/SET_MAP';
const SET_CLUSTERER = 'gallery/SET_CLUSTERER';

// action creators
export const setPage = createAction(SET_PAGE);

export const setInputTitle = createAction(SET_INPUT_TITLE);
export const setInputPlaceName = createAction(SET_INPUT_PLACENAME);
export const setInputAddress = createAction(SET_INPUT_ADDRESS);
export const setInputNickname = createAction(SET_INPUT_NICKNAME);

export const setGalleryList = createAction(SET_GALLERY_LIST);
export const setGalleryPaginate = createAction(SET_GALLERY_PAGINATE);

export const setGalleryPointList = createAction(SET_GALLERY_POINT_LIST);
export const setGalleryPointPaginate = createAction(SET_GALLERY_POINT_PAGINATE);
export const setGalleryPointTotal = createAction(SET_GALLERY_POINT_TOTAL);

export const setGalleryDetail = createAction(SET_GALLERY_DETAIL);

export const setButtonList = createAction(SET_BUTTON_LIST);

export const setTitle = createAction(SET_TITLE);
export const setPlaceInfo = createAction(SET_PLACE_INFO);
export const setThumbnail = createAction(SET_THUMBNAIL);
export const setImageList = createAction(SET_IMAGE_LIST);

export const setMap = createAction(SET_MAP);
export const setClusterer = createAction(SET_CLUSTERER);

// initial state
const initialState = Map({
    inputTitle: "",
    inputPlaceName: "",
    inputAddress: "",
    inputNickname: "",

    searchItems: fromJS([
        {
            id: 'inputTitle',
            label: "제목",
            type: "input",
            defaultValue: "",
            placeholder: "검색 제목 입력",
        },
        {
            id: 'inputPlaceName',
            label: "장소명",
            type: "input",
            defaultValue: "",
            placeholder: "검색 장소명 입력"
        },
        {
            id: 'inputAddress',
            label: "지역명",
            type: "input",
            defaultValue: "",
            placeholder: "검색 지역이름 입력"
        },
        {
            id: 'inputNickname',
            label: "작성자",
            type: "input",
            defaultValue: "",
            placeholder: "작성자 닉네임 입력"
        },
    ]),

    page: 1,
    max: 24,

    galleryList: [],
    galleryPaginate: [],

    galleryPointList: [],
    galleryPointPaginate: [],
    galleryPointTotal: 0,

    title: "",
    placeName: "",
    placeInfo: {},
    userNickname: "",
    createdAt: "",
    thumbnail: 0,
    imageList: [],

    buttonList: [],

    map: null,        // 지도 객체
    clusterer: null,
});

// reducer
export default handleActions({
    [SET_INPUT_TITLE]: (state, action) => {
        const inputTitle = action.payload;
        return state.set("inputTitle", inputTitle)
            .setIn(['searchItems', 0, 'defaultValue'], inputTitle);
    },
    [SET_INPUT_PLACENAME]: (state, action) => {
        const inputPlaceName = action.payload;
        return state.set("inputPlaceName", inputPlaceName)
            .setIn(['searchItems', 1, 'defaultValue'], inputPlaceName);
    },
    [SET_INPUT_ADDRESS]: (state, action) => {
        const inputAddress = action.payload;
        return state.set("inputAddress", inputAddress)
            .setIn(['searchItems', 2, 'defaultValue'], inputAddress);
    },
    [SET_INPUT_NICKNAME]: (state, action) => {
        const inputNickname = action.payload;
        return state.set("inputNickname", inputNickname)
            .setIn(['searchItems', 3, 'defaultValue'], inputNickname);
    },

    [SET_PAGE]: (state, action) => {
        const page = action.payload;
        return state.set("page", page);
    },
    [SET_GALLERY_LIST]: (state, action) => {
        const galleryList = action.payload;
        return state.set("galleryList", galleryList);
    },
    [SET_GALLERY_PAGINATE]: (state, action) => {
        const galleryPaginate = action.payload;
        return state.set("galleryPaginate", galleryPaginate);
    },
    [SET_GALLERY_POINT_LIST]: (state, action) => {
        const galleryPointList = action.payload;
        return state.set("galleryPointList", galleryPointList);
    },
    [SET_GALLERY_POINT_PAGINATE]: (state, action) => {
        const galleryPointPaginate = action.payload;
        return state.set("galleryPointPaginate", galleryPointPaginate);
    },
    [SET_GALLERY_POINT_TOTAL]: (state, action) => {
        const galleryPointTotal = action.payload;
        return state.set("galleryPointTotal", galleryPointTotal);
    },

    [SET_GALLERY_DETAIL]: (state, action) => {
        const data = action.payload;
        return state.set("imageList", data.images)
            .set("title", data.title)
            .set("placeName", data.placeName)
            .set("userNickname", data.user.nickname)
            .set("createdAt", data.createdAt);
    },

    [SET_BUTTON_LIST]: (state, action) => {
        const buttonList = action.payload;
        return state.set("buttonList", buttonList);
    },

    [SET_TITLE]: (state, action) => {
        const title = action.payload;
        return state.set("title", title);
    },
    [SET_PLACE_INFO]: (state, action) => {
        const placeInfo = action.payload;
        return state.set("placeInfo", placeInfo);
    },
    [SET_THUMBNAIL]: (state, action) => {
        const thumbnail = action.payload;
        return state.set("thumbnail", thumbnail);
    },
    [SET_IMAGE_LIST]: (state, action) => {
        const imageList = action.payload;
        return state.set("imageList", imageList);
    },

    [SET_MAP]: (state, action) => {
        const map = action.payload;
        return state.set("map", map);
    },
    [SET_CLUSTERER]: (state, action) => {
        const clusterer = action.payload;
        return state.set("clusterer", clusterer);
    },
}, initialState)