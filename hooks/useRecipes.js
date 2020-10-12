import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase/';

const useRecipes = (order) => {
  const [recipes, storeRecipes] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  function manageSnapshot(snapshot) {
    const recipes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    storeRecipes(recipes);
  }

  useEffect(() => {
    const getRecipes = () => {
      firebase.db.collection('recipes').orderBy(order, 'desc').onSnapshot(manageSnapshot);
    };

    getRecipes();
  }, []);
  return {
    recipes,
  };
};

export default useRecipes;
