import React, { useState, useEffect, useCallback } from "react";
import Recipe from "./Recipe";
import "./App.css";
function App() {
  const APP_ID = "69a26ae0";
  const APP_KEY = "299fe2ce0d5bb4aab2cb1ea0a3e4bbad";

  const [recipes, setrecipes] = useState([]);
  const [search, setsearch] = useState("");
  const [query, setquery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );

    const data = await response.json();
    console.log(data.hits);
    setrecipes(data.hits);
  };

  const updateSearch = (e) => {
    setsearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setquery(search);
  };

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input
          className='search-bar'
          type='text'
          value={search}
          onChange={updateSearch}
        />
        <button className='search-button' type='submit'>
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
