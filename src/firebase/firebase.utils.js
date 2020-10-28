import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBbzp1DiiceYuWPp8tDwYOcqXSvvuNj2kI",
    authDomain: "acme-search-29fb2.firebaseapp.com",
    databaseURL: "https://acme-search-29fb2.firebaseio.com",
    projectId: "acme-search-29fb2",
    storageBucket: "acme-search-29fb2.appspot.com",
    messagingSenderId: "311434842806",
    appId: "1:311434842806:web:10122498b1499c88418c17",
    measurementId: "G-XZV1DZR2EQ"
};

firebase.initializeApp(firebaseConfig);

export const AddDateFieldAndGetMatchedResult = (collections, keywords) => {

    let results = [];

    collections.docs.map(doc => {

        const obj = doc.data();

        const key = Object.keys(obj)[0];

        const dateField = (key) => {
            switch (key) {
                case "calendar":
                    return "from";
                case "tweet":
                    return "timestamp";
                case "slack":
                    return "timestamp";
                case "dropbox":
                    return "created";
                case "contacts":
                    return "last_contact";
                default: // unknown document, do nothing
            }
        }
        obj[key].forEach(element => {
            // check for query, if contains,
            // then post add source and dateFieldForComparison fields
            // finally, push to list

            if (element.matching_terms.includes(keywords)) {
                element.source = key;
                element.dateFieldForComparison = element[dateField(key)];
                results.push(element);
            }
        })
    });

    //sort result based on time
    results.sort((x, y) => new Date(y.dateFieldForComparison).getTime() - new Date(x.dateFieldForComparison).getTime());

    return results;
};


export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    for (let key in objectsToAdd) {
        const newDocRef = collectionRef.doc();
        let obj = {};
        obj[key] = objectsToAdd[key];
        batch.set(newDocRef, obj);
    }

    return await batch.commit();
};

export const addSourceFieldForSnapshot = collections => {

    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const firestore = firebase.firestore();

export default firebase;