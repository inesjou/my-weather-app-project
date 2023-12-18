function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);
