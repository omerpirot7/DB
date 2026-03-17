import axios from 'axios';

// The mock API runs on json-server at port 3000 by default.
// When moving to PHP backend later, change this to your PHP server url, e.g., 'https://api.yourdomain.com/v1'
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
