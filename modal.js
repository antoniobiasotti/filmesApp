const background = document.getElementById("modal-background");
const modalContainer = document.getElementById("modal-container");

function backgroundClickHandler() {
  overlay.classList.remove("open");
}

function createModal(data) {
    // Interpolação de String - stringTemplate + ${}
    // O JS está convertendo em String para depois concatená-los.
    // Porém quando se trata de um objeto ele retorna '[object Object]'
    // O jeito certo de transformar um objeto em String é através de um json usando o método stringify da biblioteca nativa JSON; ele converte o objeto em um string com ""
    // O método replace de Strings vai substituir aspas simples por crase
  modalContainer.innerHTML = `
  <h2 id="movie-title">${data.Title} - ${data.Year}</h2>
                <section id="modal-body">
                    <img id="movie-poster" src=${data.Poster} alt="Poster do Filme.">
                    <div id="movie-info">
                        <h3 id="movie-plot">${data.Plot}</h3>
                        <div id="movie-cast">
                            <h4>Elenco:</h4>
                            <h5>${data.Actors}</h5>
                        </div>
                        <div id="movie-genre">
                            <h4>Gênero:</h4>
                            <h5>${data.Genre}</h5>
                        </div>
                    </div>
                </section>
                <section id="modal-footer">
                    <button id="add-to-list" onclick='{addToList(${JSON.stringify(data).replace("'", '`')})}'>Adicionar à Lista</button>
                </section>`;
}

background.addEventListener("click", backgroundClickHandler);
