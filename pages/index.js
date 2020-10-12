import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import Layout from '../components/layout/Layout';
import RecipeDetails from '../components/layout/RecipeDetails';

const Home = () => {
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
      firebase.db.collection('recipes').orderBy('published', 'desc').onSnapshot(manageSnapshot);
    };

    getRecipes();
  }, []);

  return (
    <div>
      <Layout>
        <div className='recipes-list'>
          <div className='container'>
            <ul className='bg-white'>
              {recipes.map((recipe) => (
                <RecipeDetails key={recipe.id} recipe={recipe} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
