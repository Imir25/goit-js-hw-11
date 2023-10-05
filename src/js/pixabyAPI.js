import axios from 'axios';
const API_KEY = '39801546-c4bb34864e6abc7825d1e4868';

export async function getPhoto(searchQuery, pages) {
  const params = {
    key: API_KEY,
    q: searchQuery,
    page: pages,
    per_page: 40,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return await axios.get('https://pixabay.com/api/', { params });
}