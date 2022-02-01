import React from "react";

import { Provider } from 'react-redux';
import Layout from '../../components/layout/layout.jsx';
import NoticeViewContainer from './container/notice/noticeViewContainer.jsx';

import configure from './store/configure.js';
const store = configure;

const BoardViewPage = ({ location, match, history }) => {
    return (
        <Provider store={store}>
            <Layout>
                <NoticeViewContainer match={match} history={history}/>
            </Layout>
        </Provider>
    )
}

export default BoardViewPage;
