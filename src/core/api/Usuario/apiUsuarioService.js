// src/core/api/apiService.js

import axios from 'axios';

// Reemplaza con la URL base de tu API usando tu IP local
const API_BASE_URL = 'http://192.168.100.50:3000/api'; 

export const fetchRoles = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rol`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return []; 
  }
};