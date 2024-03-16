const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const key = 'b95abd07';
const movieListContainer = document.getElementById("movie-list");

// Recupera do cache do navegador e transforme ele em um objeto
let movieList = JSON.parse(localStorage.getItem('movieList')) ?? [];

async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('data: ', data);
    if(data.Error) {
      throw new Error('Filme não encontrado')
    }
    createModal(data);
    overlay.classList.add("open");
  } catch (error) {
    notie.alert({type: 'neutral', text: error.message});
  }
}

function movieNameParameterGenerator(){
  if (movieName.value === ''){
    throw new Error('O nome do filme deve ser informado')
  }
  return movieName.value.split(" ").join("+")
}

function movieYearParameterGenerator(){
  if (movieYear.value === ''){
    return '';
  }
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))){
    throw new Error('Ano do filme inválido')
  }
  return `&y=${movieYear.value}`;
}

function addToList(data) {
  //Testa se o filme já está na lista
  if (isFilmAlreadyOnTheList(data.imdbID)) {
    notie.alert({type: 'neutral', text: "Filme já está na lista"});
    return;
  }
  movieList.push(data); //Push é um método para arrays que adiciona na última posição
  updateLocalStorage();
  updateUI(data);
  overlay.classList.remove("open");
}

function updateUI(data) {
  // innerHTML - Referência para o elemento adicionar dinamicamente dentro de si mais um elemento HTML 
  movieListContainer.innerHTML += `<article id="movie-card-${data.imdbID}">
  <img src="${data.Poster}" alt="Poster do ${data.Title}.">
  <button class="remove-button" onclick='{removeFilmFromList("${data.imdbID}")}'><i class="bi bi-trash3"></i></i> Remover</button>
</article>`;
}


// Basicamente um cara-cracha dos Id's dos filmes que já estão adicionados com os Id's que vem do atributo imdbId do Objeto na chamada da API
function isFilmAlreadyOnTheList(imdbId) {
  // Função booleana auxiliar para o método find
  // Retorna o resultado de uma comparação
  function isThisIdFromThisMovie(movie) {
    return movie.imdbID === imdbId;
  }
  // O find espera uma função que retorna um valor booleano, quando for True ele achou o elemento. O critério de busca é o retorno da função isThisIdFromThisMovie;
  // O find é um método aplicado em arrays que passa um a um em cada objeto tentando aplicar a função passada como parâmetro a ele;
  return movieList.find(isThisIdFromThisMovie);
}

function removeFilmFromList(imdbId) {
  movieList = movieList.filter(movie => movie.imdbID !== imdbId); 
  // "Pra todo movie da lista aplique a condição"
  // Filter assim como find é uma função que será aplicada a todos os elementos da lista
  document.getElementById(`movie-card-${imdbId}`).remove();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('movieList', JSON.stringify(movieList));
}


movieList.forEach(updateUI);

searchButton.addEventListener("click", searchButtonClickHandler);
