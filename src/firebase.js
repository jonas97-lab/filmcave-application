import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBjflq0h2pbChrTXsOmxAZMLV8zKYiMtKI',
	authDomain: 'login-authentication-aca23.firebaseapp.com',
	projectId: 'login-authentication-aca23',
	storageBucket: 'login-authentication-aca23.appspot.com',
	messagingSenderId: '141446036571',
	appId: '1:141446036571:web:f5ececdad97d365aea137e',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
