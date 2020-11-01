import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useRecipes from '../hooks/useRecipes';
import Layout from '../components/layout/Layout';
import RecipeDetails from '../components/layout/RecipeDetails';
import Error404 from '../components/layout/404';

const Search = () => {
  const [result, setResult] = useState([]);

  const router = useRouter();
  const {
    query: { q },
  } = router;

  const { recipes } = useRecipes('published');

  useEffect(() => {
    const search = q.toLowerCase();
    const searchedRecipe = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search);
    });
    setResult(searchedRecipe);
  }, [q, recipes]);

  return (
    <div>
      <Layout>
        {!result || result.length === 0 ? (
          <Error404 title="Sorry, we couldn't find it" description='Try again with another search' />
        ) : (
          <div className='recipes-list'>
            <div className='container'>
              <ul className='bg-white'>
                {result.map((recipe) => (
                  <RecipeDetails key={recipe.id} recipe={recipe} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Search;
