import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import './index.css';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Logement from './pages/Logement';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './utils/style/GlobalStyle';

ReactDOM.render(
    <React.StrictMode>
        <Helmet>
            <title>Kasa</title>
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            />
        </Helmet>
        <Router>
            <GlobalStyle />
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/housing/:id" component={Logement} />
                <Route path="/about">
                    <About />
                </Route>
                <Route>
                    <ErrorPage />
                </Route>
            </Switch>
            <Footer />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
