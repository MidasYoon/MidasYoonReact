import React from "react";
import queryString from 'query-string';

import { Provider } from 'react-redux';
import Layout from '../../components/layout/layout.jsx';
import TravelListContainer from './container/travelListContainer.jsx';

import configure from './store/configure.js';
const store = configure;

const TravelListPage = ({ location, match, history }) => {
    const query = queryString.parse(location.search);

    return (
        <Provider store={store}>
            <Layout>
                <TravelListContainer history={history}/>
            </Layout>
        </Provider>
    )
}

export default TravelListPage;
