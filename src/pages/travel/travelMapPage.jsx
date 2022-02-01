import React from "react";
import queryString from 'query-string';

import { Provider } from 'react-redux';
import Layout from '../../components/layout/layout.jsx';
import TravelMapContainer from './container/travelMapContainer.jsx';

import configure from './store/configure.js';
const store = configure;

const TravelMapPage = ({ location, match, history }) => {
    const query = queryString.parse(location.search);

    return (
        <Provider store={store}>
            <Layout>
                <TravelMapContainer/>
            </Layout>
        </Provider>
    )
}

export default TravelMapPage;
