import axios from 'axios';

const BASE_URL =  'http://localhost:8080/api';

const postData = async (url, data, credentials = null) => {
  try {
    const fullUrl = `${BASE_URL}${url}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(credentials && { Authorization: `Bearer ${credentials}` })
      },
      withCredentials: true,
    };
    
    const response = await axios.post(fullUrl, data, config);
    return response;
  } catch (error) {
    console.error('POST Request Error:', error.response?.data || error.message);
    throw error;
  }
};
export default postData