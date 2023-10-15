import React, { useState } from 'react';
import axios from 'axios';
import "./CreateRecipe.css";
import { Link, useNavigate } from 'react-router-dom';
import {ReactComponent as IconBack} from '../../assets/icons/icon_back.svg';

function CreateRecipe() {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  const navigate = useNavigate();
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('breakfast');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState();
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setRecipeImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const handleCreate = () => {
    const formData = new FormData();
    formData.append('recipeTitle', recipeTitle);
    formData.append('recipeCategory', recipeCategory);
    formData.append('numberOfPeople', numberOfPeople);
    formData.append('prepTime', prepTime);
    formData.append('shortDescription', shortDescription);
    formData.append('description', description);
    // formData.append('recipeImage', recipeImage);
    if (file) {
      formData.append('recipeImage', file);
    }
    axios.post('http://localhost:5000/api/recipes', formData, {
      headers: {
        'x-access-token': `${token}`,
      }}).then((response) => {
      navigate('/my-recipes');
    });
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
        <div className='create-recipe-back-icon'>
          <Link to="/my-recipes">
            <IconBack width='15px' height='10px' />
          </Link>
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        <div style={{ width: '12%', display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: 'orange', fontFamily: 'cursive', margin: 0 }}>Recipe Image</p>
          <img style={{ borderRadius: '5px', height: '100px', marginTop: '5px' }} src={recipeImage} alt="" />
          <div style={{ width: '100%' }}>
            <input type="file" id="uploadImage" accept="image/png, image/jpeg" style={{ visibility: 'hidden' }} onChange={handleFileChange} />
            <label for="uploadImage" className='create-recipe-button create-recipe-upload-image-button'>Choose File</label>
          </div>
        </div>
        <div style={{ width: '88%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginLeft: '50px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="recipeTitle" style={{ color: 'orange', fontFamily: 'cursive' }}>Recipe Title</label>
                <input type="text" id="recipeTitle" name="recipeTitle" autoComplete="off" onChange={(e) => setRecipeTitle(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                  <label htmlFor="category" style={{ color: 'orange', fontFamily: 'cursive' }}>Category</label>
                  <select name="category" id="category" onChange={(e) => setRecipeCategory(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px', color: 'grey' }}>
                    <option value="breakfast">Breakfast</option>
                    <option value="brunch">Brunch</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '22px' }}>
                  <label htmlFor="preparationTime" style={{ color: 'orange', fontFamily: 'cursive' }}>Preparation Time</label>
                  <input type="number" id="preparationTime" name="preparationTime" autoComplete="off" onChange={(e) => setPrepTime(parseInt(e.target.value))} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '22px' }}>
                  <label htmlFor="numberOfPeople" style={{ color: 'orange', fontFamily: 'cursive' }}>No. People</label>
                  <input type="number" id="numberOfPeople" name="numberOfPeople" autoComplete="off" onChange={(e) => setNumberOfPeople(parseInt(e.target.value))} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="shortDescription" style={{ color: 'orange', fontFamily: 'cursive' }}>Short Description</label>
                <textarea id="shortDescription" name="shortDescription" rows="3" onChange={(e) => setShortDescription(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px', resize: 'none' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%', marginLeft: '50px' }}>
              <label htmlFor="recipe" style={{ color: 'orange', fontFamily: 'cursive' }}>Recipe</label>
              <textarea id="recipe" name="recipe" rows="10" onChange={(e) => setDescription(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px', resize: 'none' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '20%', marginLeft: '50px' }}>
            <button className='create-recipe-button create-recipe-button-submit' onClick={handleCreate}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRecipe;
