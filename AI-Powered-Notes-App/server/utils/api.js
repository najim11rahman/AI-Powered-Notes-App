import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getSummary = (content, token) =>
  API.post(
    '/ai/summarize',
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
