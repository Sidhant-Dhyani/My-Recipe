
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProductsCard from './UserProductsCard';
import { BASE_URL } from '../../../config';

const GetUserRecipe = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users/allUserRecipes`);
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes By Our Users</h1>
            <ul style={{ listStyle: 'none' }}>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <UserProductsCard recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetUserRecipe;