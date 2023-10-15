import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';
import {ReactComponent as Time} from '../../assets/icons/time.svg';
import {ReactComponent as Plate} from '../../assets/icons/plate.svg';
import {ReactComponent as ArrowsRight} from '../../assets/icons/arrows_right.svg';
import { StarIcon } from "@heroicons/react/24/solid";

function Card({ content, openModal, handleLike }) {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  const [recipeStars, setRecipeStars] = useState(content.likedBy?.length);

  useEffect(() => {
    setRecipeStars(content.likedBy?.length);
  }, [content.likedBy?.length]);

  const handleLikeRecipe = async (event) => {
    event.preventDefault();
    const action = content.likedBy?.includes(userId) ? 'unlike' : 'like';
    await axios.put(`http://localhost:5000/api/recipes/${content._id}/${action}`, content, {
      headers: {
        'x-access-token': `${token}`,
      }}).then((response) => {
        setRecipeStars(response.data?.length);
        handleLike();
    });
  }

  return (
    <div className='card-container'>
      <div className='card-image' style={{ backgroundImage: `url(${content.recipeImage})` }}>
        <div className='card-category'>{content.recipeCategory}</div>
      </div>
      <div className='card-body'>
        <p className='card-body-title'>{content.recipeTitle}</p>
        <p className='card-body-description'>{content.shortDescription}</p>
        <div className='card-footer'>
          <div style={{ display: 'flex' }}>
            <div className='card-footer-item'>
              <Time style={{ marginRight: '5px'  }} />
              <div><b>{content.prepTime} min</b></div>
            </div>
            <div className='card-footer-item'>
              <Plate style={{ marginRight: '5px'  }} />
              <div><b>{content.numberOfPeople}</b></div>
            </div>
            <div className='card-footer-item'>
              <span onClick={handleLikeRecipe}>
                <StarIcon
                  style={{
                    marginRight: "5px",
                    height: "20px",
                    width: "20px",
                    color:
                      (content.likedBy?.includes(userId))
                        ? "orange"
                        : "gray",
                  }}
                />
              </span>
              <div><b>{recipeStars}</b></div>
            </div>
          </div>
          <div>
            <div className='card-footer-item-right'>
              <ArrowsRight onClick={openModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
