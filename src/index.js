import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import IndexPage from './pages/index/indexPage.jsx';
import BoardListPage from './pages/board/boardListPage.jsx';
import BoardViewPage from './pages/board/boardViewPage.jsx';

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
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
