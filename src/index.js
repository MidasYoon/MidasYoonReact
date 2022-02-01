import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import IndexPage from './pages/index/indexPage.jsx';
import BoardListPage from './pages/board/boardListPage.jsx';
import BoardViewPage from './pages/board/boardViewPage.jsx';
import TravelListPage from './pages/travel/travelListPage.jsx';
import TravelMapPage from './pages/travel/travelMapPage.jsx';
import TravelViewPage from './pages/travel/travelViewPage.jsx';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <BrowserRouter>
                <Route exact path="/" component={IndexPage}/>
                <Route exact path="/board" component={BoardListPage}/>
                <Route exact path="/board/:id" component={BoardViewPage}/>

                <Route exact path="/travel" component={TravelListPage}/>
                <Route exact path="/travel/map" component={TravelMapPage}/>
                <Route exact path="/travel/:id" component={TravelViewPage}/>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
