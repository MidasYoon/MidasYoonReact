import React from "react";
import queryString from 'query-string';

import { Provider } from 'react-redux';
import Layout from '../../components/layout/layout.jsx';
import TravelViewContainer from './container/travelViewContainer.jsx';

import configure from './store/configure.js';
const store = configure;

const TravelVuewPage = ({ location, match, history }) => {
    const query = queryString.parse(location.search);

    return (
        <Provider store={store}>
            <Layout>
                <TravelViewContainer match={match} history={history}/>
            </Layout>
        </Provider>
    )
}

export default TravelVuewPage;
