const API_KEY = "njYQSDt2EY97tLbK9MCcZ4BQBnvSC1SD";
const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=12&q=`;

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const gifContainer = document.getElementById("gifContainer");
const clearButton = document.getElementById("clearButton");

async function fetchGIFs(query) {
  try {
    const response = await fetch(API_URL + query);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    displayGIFs(data.data);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    gifContainer.innerHTML = "<p>Failed to load GIFs. Try again later.</p>";
  }
}

function displayGIFs(gifs) {
  gifContainer.innerHTML = "";

  if (gifs.length === 0) {
    gifContainer.innerHTML = "<p>No GIFs found. Try another search.</p>";
    return;
  }

  gifs.forEach((gif) => {
    const gifElement = document.createElement("div");
    gifElement.classList.add("gif-item");

    gifElement.innerHTML = `
      <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
    `;

    gifContainer.appendChild(gifElement);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (query) {
    fetchGIFs(query);
  }
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  gifContainer.innerHTML = "";
});
