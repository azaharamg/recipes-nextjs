import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

function useAuth() {
  const [authenticatedUser, storeAuthenticatedUser] = useState(null);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        storeAuthenticatedUser(user);
      } else {
        storeAuthenticatedUser(null);
      }
    });
    return () => unsuscribe;
  }, []);

  return authenticatedUser;
}

export default useAuth;
