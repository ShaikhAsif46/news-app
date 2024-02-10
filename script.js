// Define News API key and base URL
const API_KEY = "afa81da1959d4f77a87abef2f95b4a16";
const url = "https://newsapi.org/v2/everything?q=";

// Execute fetchNews function with default query on page load
window.addEventListener("load", () => fetchNews("India"));

// Reload the page function
function reload(){
  window.location.reload()
}

// Asynchronously fetch news data from the News API
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  // Convert the response to JSON
  const data = await res.json();
  console.log(data);
  // Update the DOM with the fetched articles
  bindData(data.articles);
}

// Populate the HTML template with news articles and append to the DOM
function bindData(articles) {
  // Get the container and template
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  // Clear the container before adding new articles
  cardsContainer.innerHTML = "";

  // Iterate through each article
  articles.forEach((article) => {
    // If there is no image, skip adding the card
    if (!article.urlToImage) return;
    // Clone the news card template
    const cardClone = newsCardTemplate.content.cloneNode(true);
    // Fill in data for the cloned card
    fillDataInCard(cardClone, article);
    // Append the card to the container
    cardsContainer.appendChild(cardClone);
  });
}

// Fill in data for a news card
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  // Set the image source, title, and description
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  // Format the publication date and set the source
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} . ${date}`;

  // Open the article in a new tab when the card is clicked
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// Track the currently selected navigation item
let curSelectedNav = null;

// Handle click on a navigation item
function onNavItemClick(id) {
  // Fetch news based on the selected category
  fetchNews(id);
  // Update the active state of navigation items
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav = navItem;
  curSelectedNav.classList.add('active');
}

// Get search button and search text input
const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text')

// Handle click on the search button
searchButton.addEventListener('click', () => {
  // Get the search query from the input
  const query = searchText.value;
  // If the query is empty, do nothing
  if (!query) return;
  // Fetch news based on the search query
  fetchNews(query);
  // Clear the active state of navigation items
  curSelectedNav?.classList.remove('active');
  curSelectedNav = null
})

// ... (previous code)

// Handle key press in the search input
searchText.addEventListener('keydown', (event) => {
  // Check if the pressed key is Enter (key code 13)
  if (event.key === 'Enter') {
    // Get the search query from the input
    const query = searchText.value;
    // If the query is empty, do nothing
    if (!query) return;
    // Fetch news based on the search query
    fetchNews(query);
    // Clear the active state of navigation items
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
  }
});

// ... (rest of the code)
