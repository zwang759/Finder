import React from 'react';
import {Route, Switch} from 'react-router-dom';
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/parts/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import SearchResult from "./components/searchResult/SearchResult";
// import {DATA} from "./data/data";
// import {addCollectionAndDocuments} from "./firebase/firebase.utils";

const App = () => {
    // add raw data to firebase collection
    // React.useEffect(() => {
        // addCollectionAndDocuments("collections", DATA);
    // }, []);

    return (
        <>
            <GlobalStyles/>
            <Header/>
            <Switch>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/search/results" component={SearchResult}/>
                {/*<Route exact path="/analytics" component={Analytics}/>*/}
            </Switch>
        </>
    );
};

export default App;