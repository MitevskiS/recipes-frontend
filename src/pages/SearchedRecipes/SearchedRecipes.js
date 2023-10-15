import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import "./SearchedRecipes.css";
import Modal from '../../components/Modal';
import ModalRecipeCard from '../../components/ModalRecipeCard';

function SearchedRecipes() {
  const navigate = useNavigate();
  const search = JSON.parse(localStorage.getItem('search'));
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIndex, setIsOpenIndex] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    axios.get(`http://localhost:5000/api/recipes/?search=${search}`).then((response) => {
      setRecipes(response.data);
    });
  }

  const handleLike = () => {
    getRecipes();
  }

  useEffect(() => {
    getRecipes();
  }, [search]);

  const openModal = (event, index) => {
    event.stopPropagation();
    setIsOpen(true);
    setIsOpenIndex(index);
  }

  const closeModal = () => {
    handleLike();
    setIsOpen(false);
  }

  const searchRecipes = async (value) => {
    localStorage.setItem('search', JSON.stringify(value));
    value ? navigate('/results') : navigate('/');
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input type="text" id="search" placeholder="Search by name" autoComplete="off" onChange={(e) => searchRecipes(e.target.value)} style={{ background: '#F0EFEA', border: '1px solid #CECDCB', borderRadius: '3px', marginTop: '5px', padding: '5px' }} value={search} />
      </div>
      <div className="searched-recipes-container">
        <p className="searched-recipes-title">Searched Recipes</p>
        <div className="searched-recipes-container-line" />
      </div>
      <div className="searched-recipes-list">
        {recipes.map((recipe, i) => {
          return (
            <div key={recipe.title} className="searched-recipes-list-item">
              <Modal isOpen={isOpen && isOpenIndex === i} onClose={closeModal} headerTitle={recipe.recipeTitle}>
                <ModalRecipeCard content={recipe} handleLike={handleLike} />
              </Modal>
              <Card content={recipe} openModal={(event) => openModal(event, i)} handleLike={handleLike} />
            </div>
          )
        })}
      </div>
    </>
  );
}

export default SearchedRecipes;
