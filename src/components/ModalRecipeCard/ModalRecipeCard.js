import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModalRecipeCard.css';
import {ReactComponent as Time} from '../../assets/icons/time.svg';
import {ReactComponent as Plate} from '../../assets/icons/plate.svg';
import { StarIcon } from "@heroicons/react/24/solid";

function ModalRecipeCard({ content, handleLike }) {
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
    <div className='modal-recipe-card-container'>
        <div style={{ width: '45%' }}>
            <div className='modal-recipe-card-image' style={{ backgroundImage: `url(${content.recipeImage})` }} />
            <div className='modal-recipe-card-body'>
                <div className='modal-recipe-card-body-short-description'>
                    <p className='modal-recipe-card-body-short-description-text'>Best Served For</p>
                    <div className='modal-recipe-card-body-category'>{content.recipeCategory}</div>
                </div>
                <p className='modal-recipe-card-body-short-description'>{content.shortDescription}</p>
                <div className='modal-recipe-card-footer'>
                    <div style={{ display: 'flex' }}>
                        <div className='modal-recipe-card-footer-item'>
                        <Time style={{ marginRight: '5px'  }} />
                        <div><b>{content.prepTime} min</b></div>
                        </div>
                        <div className='modal-recipe-card-footer-item'>
                        <Plate style={{ marginRight: '5px'  }} />
                        <div><b>{content.numberOfPeople}</b></div>
                        </div>
                        <div className='modal-recipe-card-footer-item'>
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
                </div>
            </div>
        </div>
        <div style={{ width: '55%' }}>
            <p className='modal-recipe-card-body-description-title'>Recipe Details</p>
            <p className='modal-recipe-card-body-description'>{content.description}</p>
        </div>
    </div>
  );
}

export default ModalRecipeCard;
