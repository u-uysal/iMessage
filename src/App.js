import React, { useEffect } from 'react';
import Imessage from "./components/Imessage"
import { useSelector, useDispatch } from "react-redux"
import firebase from "./firebase"

import './App.css';
import { selectUser, login, logout } from './features/userSlice';
import Login from './components/Login';
import { auth } from "./firebase"

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        // user is logged out
        dispatch(logout())
      }
    })
  }, [])
  return (
    <div className="App">

      {user ? <Imessage /> : <Login />}
    </div>
  );
}

export default App;