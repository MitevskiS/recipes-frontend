import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../../pages/Home';
import RecipeCategory from '../../pages/RecipeCategory';
import SearchedRecipes from '../../pages/SearchedRecipes';
import Login from '../../components/Login/Login';
import CreateAccount from '../../components/CreateAccount';
import MyProfile from '../../pages/MyProfile/MyProfile';
import CreateRecipe from '../../pages/CreateRecipe/CreateRecipe';
import EditRecipe from '../../pages/EditRecipe/EditRecipe';
import MyRecipes from '../../pages/MyRecipes';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="breakfast"
          element={
            <Layout>
              <RecipeCategory category="breakfast" />
            </Layout>
          }
        />
        <Route
          path="brunch"
          element={
            <Layout>
              <RecipeCategory category="brunch" />
            </Layout>
          }
        />
        <Route
          path="lunch"
          element={
            <Layout>
              <RecipeCategory category="lunch" />
            </Layout>
          }
        />
        <Route
          path="dinner"
          element={
            <Layout>
              <RecipeCategory category="dinner" />
            </Layout>
          }
        />
        <Route
          path="results"
          element={
            <Layout>
              <SearchedRecipes />
            </Layout>
          }
        />
        <Route
          path="create-recipe"
          element={
            <Layout>
              <CreateRecipe />
            </Layout>
          }
        />
        <Route
          path="edit-recipe/:id"
          element={
            <Layout>
              <EditRecipe />
            </Layout>
          }
        />
        <Route
          path="my-recipes"
          element={
            <Layout>
              <MyRecipes />
            </Layout>
          }
        />
        <Route
          path="my-profile"
          element={
            <Layout>
              <MyProfile />
            </Layout>
          }
        />
        <Route
          path="login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="create-account"
          element={
            <Layout>
              <CreateAccount />
            </Layout>
          }
        />
        <Route path="error" element={<div>Error page</div>} />
        <Route path="*" element={<div>404 Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter as default };
