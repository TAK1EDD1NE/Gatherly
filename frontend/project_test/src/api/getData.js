import axios from 'axios';

const BASE_URL =  'http://localhost:8080/api';

const getData= async (url, query = {}, credentials = null) => {
  try {
    // Convert query object to query string
    const queryString = new URLSearchParams(query).toString();
    const fullUrl = `${BASE_URL}${url}${queryString ? `?${queryString}` : ''}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(credentials && { Authorization: `Bearer ${credentials}` })
      },
      withCredentials: true,
    };

    const response = await axios.get(fullUrl, config);
    return response.data;
  } catch (error) {
    console.error('GET Request Error:', error.response?.data || error.message);
    throw error;
  }
};
export default getData 