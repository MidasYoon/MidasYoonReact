import React from "react";
import queryString from 'query-string';

import { Provider } from 'react-redux';
import Layout from '../../components/layout/layout.jsx';
import NoticeListContainer from './container/notice/noticeListContainer.jsx';

import configure from './store/configure.js';
const store = configure;

const BoardListPage = ({ location, match, history }) => {
    const query = queryString.parse(location.search);

    return (
        <Provider store={store}>
            <Layout>
                <NoticeListContainer/>
            </Layout>
        </Provider>
    )
}

export default BoardListPage;
