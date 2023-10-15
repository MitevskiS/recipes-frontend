import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./MyRecipes.css";
import { Link, useNavigate } from 'react-router-dom';
import {ReactComponent as IconPlus} from '../../assets/icons/icon_plus.svg';
import {ReactComponent as IconTrashcan} from '../../assets/icons/icon_trashcan.svg';

function MyRecipes() {
  const userId = JSON.parse(localStorage.getItem('user'))?.token;
  const navigate = useNavigate();
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/my-recipes', {
      headers: {
        'x-access-token': `${userId}`,
      }}).then((response) => {
      setMyRecipes(response.data);
    });
  }, [userId]);

  const editRecipe = (id) => {
    navigate(`/edit-recipe/${id}`)
  }

  const handleDelete = (id, e) => {
    e.stopPropagation();
    axios.delete(`http://localhost:5000/api/recipes/${id}`, {
      headers: {
        'x-access-token': `${userId}`,
      }}).then((response) => {
      const recipes = [...myRecipes];
      setMyRecipes(recipes.filter((item) => item._id !== id));
    });
  }

  const formatedDate = (date) => {
    let dayNumber, monthNumber, day, month, year;
    let newDate = new Date(date);

    dayNumber = newDate.getDate();
    day = dayNumber < 10 ? `0${dayNumber}` : dayNumber;
    monthNumber = newDate.getMonth() + 1;
    month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
    year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ color: '#96BB36', fontSize: '27px', fontFamily: 'cursive', width: '185px' }}>My Recipes</p>
        <div style={{
          width: '100%',
          border: '1px solid #EFEEEA',
          marginLeft: '10px',
        }} />
        <div className='my-recipes-create-icon'>
          <Link to="/create-recipe">
            <IconPlus width='15px' height='10px' />
          </Link>
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        <table className="my-recipes-table">
            <thead>
                <tr>
                    <th>Recipe Name</th>
                    <th>Category</th>
                    <th>Created On</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {myRecipes.map((recipe) => {
                    return (
                        <tr key={recipe.recipeTitle} onClick={() => editRecipe(recipe._id)}>
                            <td>{recipe.recipeTitle}</td>
                            <td><div style={{ background: '#96BB36', color: 'white', textAlign: 'center', fontSize: '14px', padding: '3px', borderRadius: '6px' }}>{recipe.recipeCategory}</div></td>
                            <td>{formatedDate(recipe.creationDate)}</td>
                            <td style={{ textAlign: 'center' }}>
                                <IconTrashcan width='15px' height='15px' className="my-recipes-table-delete" onClick={(e) => handleDelete(recipe._id, e)} />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </div>
    </>
  );
}

export default MyRecipes;
