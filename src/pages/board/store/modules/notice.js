import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
  
// action types
const SET_INPUT_TITLE = 'notice/SET_INPUT_TITLE';

const SET_PAGE = 'notice/SET_PAGE';

const SET_NOTICE_LIST = 'notice/SET_NOTICE_LIST';
const SET_NOTICE_TOTAL = 'notice/SET_NOTICE_TOTAL';
const SET_NOTICE_PAGINATE = 'notice/SET_NOTICE_PAGINATE';

const SET_BOARD = 'notice/SET_BOARD';
const SET_COMMENTS = 'notice/SET_COMMENTS';
const SET_FILES = 'notice/SET_FILES';

const SET_TITLE = 'notice/SET_TITLE';
const SET_CONTENT = 'notice/SET_CONTENT';
const SET_IMAGE_URLS = 'notice/SET_IMAGE_URLS';
const SET_ADD_FILES = 'notice/SET_ADD_FILES';

const SET_BUTTON_LIST = 'notice/SET_BUTTON_LIST';

// action creators
export const setInputTitle = createAction(SET_INPUT_TITLE);

export const setPage = createAction(SET_PAGE);

export const setNoticeList = createAction(SET_NOTICE_LIST);
export const setNoticeTotal = createAction(SET_NOTICE_TOTAL);
export const setNoticePaginate = createAction(SET_NOTICE_PAGINATE);

export const setBoard = createAction(SET_BOARD);
export const setComments = createAction(SET_COMMENTS);
export const setFiles = createAction(SET_FILES);

export const setTitle = createAction(SET_TITLE);
export const setContent = createAction(SET_CONTENT);
export const setImageUrls = createAction(SET_IMAGE_URLS);
export const setAddFiles = createAction(SET_ADD_FILES);

export const setButtonList = createAction(SET_BUTTON_LIST);

// initial state
const initialState = Map({
    inputTitle: "",

    searchItems: fromJS([
        {
            id: 'inputTitle',
            label: "게시글 제목",
            type: "input",
            defaultValue: '',
            placeholder: "",
        },
    ]),

    listTotal: 0,
    listRow: [],
    listPaginate: [],

    page: 1,
    max: 20,

    board: {
        id: '',
        title: '',
        content: '',
        user: {
            nickname: '',
        },
    },
    comments: [],
    files: List([]),
    addFiles: List([]),
    imageUrls: [],
    title: '',
    content: '',

    buttonList: [],
});

// reducer
export default handleActions({
    [SET_INPUT_TITLE]: (state, action) => {
        const inputTitle = action.payload;
        return state.set("inputTitle", inputTitle)
            .setIn(['searchItems', 0, 'defaultValue'], inputTitle);
    },

    [SET_PAGE]: (state, action) => {
        const page = action.payload;
        return state.set("page", page);
    },

    [SET_NOTICE_LIST]: (state, action) => {
        const listRow = action.payload;
        return state.set("listRow", listRow);
    },
    [SET_NOTICE_TOTAL]: (state, action) => {
        const listTotal = action.payload;
        return state.set("listTotal", listTotal);
    },
    [SET_NOTICE_PAGINATE]: (state, action) => {
        const listPaginate = action.payload;
        return state.set("listPaginate", listPaginate);
    },

    [SET_BOARD]: (state, action) => {
        const board = action.payload;
        return state.set("board", board);
    },
    [SET_COMMENTS]: (state, action) => {
        const comments = action.payload;
        return state.set("comments", comments);
    },
    [SET_FILES]: (state, action) => {
        const files = action.payload;
        return state.set("files", List(files));
    },
    [SET_ADD_FILES]: (state, action) => {
        const addFiles = action.payload;
        return state.set("addFiles", List(addFiles));
    },

    [SET_TITLE]: (state, action) => {
        const title = action.payload;
        return state.set("title", title);
    },
    [SET_CONTENT]: (state, action) => {
        const content = action.payload;
        return state.set("content", content);
    },
    [SET_IMAGE_URLS]: (state, action) => {
        const imageUrls = action.payload;
        return state.set("imageUrls", imageUrls);
    },

    [SET_BUTTON_LIST]: (state, action) => {
        const buttonList = action.payload;
        return state.set("buttonList", buttonList);
    },
}, initialState)
