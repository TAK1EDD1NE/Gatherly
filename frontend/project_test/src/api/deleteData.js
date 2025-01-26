import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export default deleteData = async (url, credentials = null) => {
  try {
    const fullUrl = `${BASE_URL}${url}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(credentials && { Authorization: `Bearer ${credentials}` })
      },
      withCredentials: true,
    };

    const response = await axios.delete(fullUrl, config);
    return response.data;
  } catch (error) {
    console.error('DELETE Request Error:', error.response?.data || error.message);
    throw error;
  }
};