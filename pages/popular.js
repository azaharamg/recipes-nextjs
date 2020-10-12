import React from 'react';
import useRecipes from '../hooks/useRecipes';
import Layout from '../components/layout/Layout';
import RecipeDetails from '../components/layout/RecipeDetails';

const Popular = () => {
  const { recipes } = useRecipes('votes');

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

export default Popular;
