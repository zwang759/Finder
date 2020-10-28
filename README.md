<h1>Finder</h1>
<p> A search engine UI that support search through twitter, slack, contacts, calendar, and files</p>
<p>Click <a href="https://acme-search-29fb2.web.app">here</a> to live preview.</p>

## Tech stacks

- [x] JavaScript
- [x] React.js
- [x] Styled Components
- [x] Redux
- [x] React Icons
- [x] React Router
- [x] Redux-persist
- [x] Redux-logger
- [x] Moment.js

## Folders
dashboard: contains the homepage

searchResult: contains the result page after search

analytics: empty for future work

parts: all the small components

data: the dataset I used, you can put it as the redux initial state.
        However, because I have setup the firebase, 
        you can simply use the data in my firebase, and they are identical.

redux: actions, reducer, and redux-saga, redux logger middleware

firebase: google's cloud database, using for showing fetch data through react

styles: the global styles by styled-components


## Starting Development Environment

1. Run `npm install` or `yarn install`.<br />
2. Run `npm start` and access `http://localhost:3000`.<br />

## Design Decision

Since this is a Fronted coding project, I try to move all coding parts into the frontend.

a. Search results are filtered by the matched_terms

b. Ranking is ordered by timestamp from the lastest to the oldest, to achieve this, I add an extra field called dateFieldForComparison
which is derived from their date field. Usually, for information retrieval we have to build the inverted index for fast
retrieval and calculate the relevance score through TF-IDF, in a real project, we can utilize Elasticsearch to do
this for us

c. Implement the features of Pin, unpin, tag, update tags, delete a tag using redux-persistent storage (local storage)
In this way, even we do not have a user management system, we can still let users add tags and pin results and the
results are going to be kept as long as they do not clear local storage. (refresh page, close, and reopen are all safe)

d. Implement the features of tracking a user's search history. The search history will show as a search suggestion when user input
queries in order that the most recently entered query will always be on the top.

e. Powered the view with a material UI, a powerful and easy to use a framework that saves me a lot of time.

f. Using redux to manage states so that state updates become easy to follow and safe (no side effect because of immutability).

g. Using redux-saga as the middleware so that we separate the actions and the state updates, this is very useful when
you have many different actions and maybe some of these actions depend on others. Utilize the takeLatest method
to only respond to the latest one.

h. Using Redux-logger to print all the states actions for debugging


## Future Work
For real-time updates of the result without letting the user refresh the page or input a new query, I was planning to use a firebase to complete it. However, I don't have enough time for it. The idea is that
Firebase API empowers me to listen to the database document change. Therefore, I can simply check for the user's
current query and append a new result to the top whenever the newly updated documents
have more relevant data.

Autocompletion, since our app has fetched all the data at the beginning, it is reasonable to implement such a feature and
it should be easy if I have time.

Testing, due to limited time, I don't write the test scripts. If I have time, I would do it using Enzyme.
I could also use Jest to test the data coming out of the API.

