
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';
import { BASE_URL } from '../../../config';

const UserProductsPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users/getOneByUser/${id}`);
                setRecipe(response.data.recipes[0]);
                const userResponse = await axios.get(`${BASE_URL}/api/users/getUser/${response.data.recipes[0].userId}`);
                setUser(userResponse.data.user.fullName);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="UserProducts_recipe-container">
            <h1 className="UserProducts_recipe-title">{recipe.name}</h1>
            <img className="UserProducts_recipe-image" src={recipe.image} alt={recipe.name} />
            <p className="UserProducts_recipe-description">{recipe.description}</p>
            <h2 className="UserProducts_recipe-section-title">Ingredients:</h2>
            <ol className="UserProducts_recipe-list">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="UserProducts_recipe-list-item">{ingredient}</li>
                ))}
            </ol>
            <h2 className="UserProducts_recipe-section-title">Steps:</h2>
            <ol className="UserProducts_recipe-list">
                {recipe.steps.map((step, index) => (
                    <li key={index} className="UserProducts_recipe-list-item"><span>{`Step:${index + 1} `}</span>{step}</li>
                ))}
            </ol>
            <p className="UserProducts_submitted-by"><span style={{ fontWeight: 'bold' }}>Recipe By :</span> {user}</p>
        </div>
    );
};

export default UserProductsPage;