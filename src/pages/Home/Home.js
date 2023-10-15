import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import "./Home.css";
import Modal from '../../components/Modal';
import ModalRecipeCard from '../../components/ModalRecipeCard';

function Home() {
  const navigate = useNavigate();
  const search = JSON.parse(localStorage.getItem('search'));
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMostPopular, setIsOpenMostPopular] = useState(false);
  const [isOpenIndex, setIsOpenIndex] = useState(null);
  const [isOpenMostPopularIndex, setIsOpenMostPopularIndex] = useState(null);
  const [freshAndNewRecipes, setFreshAndNewRecipes] = useState([]);
  const [mostPopularRecipes, setMostPopularRecipes] = useState([]);

  const getFreshAndNewRecipes = () => {
    axios.get('http://localhost:5000/api/recipes?category=freshAndNew').then((response) => {
      setFreshAndNewRecipes(response.data);
    });
  }

  const getMostPopularRecipes = () => {
    axios.get('http://localhost:5000/api/recipes?category=mostPopular').then((response) => {
      setMostPopularRecipes(response.data);
    });
  }

  const handleLike = () => {
    getFreshAndNewRecipes();
    getMostPopularRecipes();
  }

  useEffect(() => {
    getFreshAndNewRecipes();
    getMostPopularRecipes();
  }, []);

  axios.put('http://localhost:5000/api/recipes/:id/like').then((response) => {
    setMostPopularRecipes(response.data);
  });

  const openModal = (event, index) => {
    event.stopPropagation();
    setIsOpen(true);
    setIsOpenIndex(index);
  }

  const openMostPopularModal = (event, index) => {
    event.stopPropagation();
    setIsOpenMostPopular(true);
    setIsOpenMostPopularIndex(index);
  }

  const closeFreshAndNewModal = async () => {
    await getFreshAndNewRecipes();
    setIsOpen(false);
  }

  const closeMostPopularModal = async () => {
    await getMostPopularRecipes();
    setIsOpenMostPopular(false);
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
      <div className="home-container">
        <p className="home-title">Fresh & New</p>
        <div className="home-container-line" />
      </div>
      <div className="home-list">
        {freshAndNewRecipes.map((recipe, i) => {
          return (
            <div key={recipe.recipeTitle} className="home-list-item">
              <Modal isOpen={isOpen && isOpenIndex === i} onClose={closeFreshAndNewModal} headerTitle={recipe.recipeTitle}>
                <ModalRecipeCard content={recipe} handleLike={handleLike} />
              </Modal>
              <Card content={recipe} openModal={(event) => openModal(event, i)} handleLike={handleLike} />
            </div>
          )
        })}
      </div>
      <div className="home-container-most-popular">
        <p className="home-title-most-popular">Most Popular Recipes</p>
        <div className="home-container-most-popular-line" />
      </div>
      <div className="home-most-popular-list">
        {mostPopularRecipes.map((recipe, i) => {
          return (
            <div key={recipe.recipeTitle} className="home-most-popular-list-item">
              <Modal isOpen={isOpenMostPopular && isOpenMostPopularIndex === i} onClose={closeMostPopularModal} headerTitle={recipe.recipeTitle}>
                <ModalRecipeCard content={recipe} handleLike={handleLike} />
              </Modal>
              <Card content={recipe} openModal={(event) => openMostPopularModal(event, i)} handleLike={handleLike} />
            </div>
          )
        })}
      </div>
    </>
  );
}

export default Home;
