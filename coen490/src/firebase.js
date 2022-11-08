import firebase from "firebase/compat/app"
import "firebase/compat/auth"



const app = firebase.initializeApp({
   apiKey: process.env.REACT_APP_FIREBASE_AUTH_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_AUTH_PROJ_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_AUTH_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_AUTH_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_AUTH_APP_ID,
   measurementId: process.env.REACT_APP_FIREBASE_AUTH_MEASUREMENT_ID
})

export const auth = app.auth()
export default app
