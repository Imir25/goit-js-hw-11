import axios from 'axios';
import Notiflix from 'notiflix';

const loadMoreButton = document.querySelector('.load-more');
const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');
const resultsContainer = document.querySelector('.results-container');

let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '39801546-c4bb34864e6abc7825d1e4868',
        q: searchInput.value.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    });

    const data = response.data;
    if (data.hits.length === 0) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreButton.style.display = 'none';
    } else {
      displaySearchResults(data.hits);
    }
  } catch (error) {
    console.error('Помилка запиту:', error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please try reloading the page.');
  }
});

function displaySearchResults(results) {
  resultsContainer.innerHTML = '';
  if (results.length === 0) {
    return;
  }
  results.forEach((result) => {
    const imageElement = document.createElement('img');
    imageElement.src = result.webformatURL;
    imageElement.alt = result.tags;
    resultsContainer.appendChild(imageElement);
  });
}

const showEndOfResultsMessage = () => {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
};

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '39801546-c4bb34864e6abc7825d1e4868',
        q: searchInput.value.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    });

    const data = response.data;
    if (data.hits.length === 0) {
      showEndOfResultsMessage();
      loadMoreButton.style.display = 'none';
    } else {
      displaySearchResults(data.hits);
      totalHits = data.totalHits;
      if (page * 40 >= totalHits) {
        showEndOfResultsMessage();
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'block';
      }
    }
  } catch (error) {
    console.error('Помилка запиту:', error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please try reloading the page.');
  }
});

const searchImages = async () => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '39801546-c4bb34864e6abc7825d1e4868',
        q: searchInput.value.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    });

    const data = response.data;
    if (data.hits.length === 0) {
      showEndOfResultsMessage();
      loadMoreButton.style.display = 'none';
    } else {
      displaySearchResults(data.hits);
      totalHits = data.totalHits;
      if (page * 40 >= totalHits) {
        showEndOfResultsMessage();
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'block';
      }
    }
  } catch (error) {
    console.error('Помилка запиту:', error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please try reloading the page.');
  }
};

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  page = 1;
  totalHits = 0;
  loadMoreButton.style.display = 'none';
  searchImages();
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '39801546-c4bb34864e6abc7825d1e4868',
        q: searchInput.value.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    });

    const data = response.data;
    if (data.hits.length === 0) {
      showEndOfResultsMessage();
      loadMoreButton.style.display = 'none';
    } else {
      displaySearchResults(data.hits);
      totalHits = data.totalHits;
      if (page * 40 >= totalHits) {
        showEndOfResultsMessage();
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'block';
      }
    }
  } catch (error) {
    console.error('Помилка запиту:', error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please try reloading the page.');
  }
});

window.addEventListener('load', () => {
  searchImages();
});