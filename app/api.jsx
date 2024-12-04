import axios from 'axios';

// Base URL for TheMealDB API
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Fetches all meal categories.
 * Endpoint: /categories.php
 */
export const getMealCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories.php`);
    return response;
  } catch (error) {
    console.error('Error fetching meal categories:', error);
    throw error;
  }
};

/**
 * Fetches meals filtered by category.
 * Endpoint: /filter.php?c={category}
 * @param {string} category - The category to filter meals by.
 */
export const getMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
    return response;
  } catch (error) {
    console.error(`Error fetching meals for category "${category}":`, error);
    throw error;
  }
};

/**
 * Fetches a random meal.
 * Endpoint: /random.php
 */
export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random.php`);
    return response;
  } catch (error) {
    console.error('Error fetching random meal:', error);
    throw error;
  }
};
