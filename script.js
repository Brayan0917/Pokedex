const listaPokemonsElemento = document.getElementById('listaPokemons');
const modalElemento = document.getElementById('modal');
const tituloModalElemento = document.getElementById('tituloModal');
const imagenModalElemento = document.getElementById('imagenModal');
const detallesModalElemento = document.getElementById('detallesModal');
const inputBusquedaElemento = document.getElementById('searchInput');

function obtenerDatosPokemons() {
  fetch('pokemons.json')
    .then(response => response.json())
    .then(data => {
      const pokemons = data;
      
      mostrarListaPokemons(pokemons);

      inputBusquedaElemento.addEventListener('input', () => {
        const terminoBusqueda = inputBusquedaElemento.value.toLowerCase();
        const pokemonsFiltrados = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(terminoBusqueda));
        mostrarListaPokemons(pokemonsFiltrados);
      });
    })
    .catch(error => console.error(error));
}
function obtenerDetallesPokemon(pokemon) {
  mostrarModal(pokemon);
}

function mostrarListaPokemons(pokemons) {
  listaPokemonsElemento.innerHTML = '';

  const pokemonsUnicos = pokemons.filter((pokemon, index) => {
    const primerIndice = pokemons.findIndex(p => p.name === pokemon.name);
    return index === primerIndice;
  });

  pokemonsUnicos.forEach(pokemon => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';

    const imagen = new Image();
    imagen.src = pokemon.ThumbnailImage;
    imagen.alt = pokemon.name;
    tarjeta.appendChild(imagen);

    const nombre = document.createElement('h3');
    nombre.textContent = pokemon.name;
    tarjeta.appendChild(nombre);

    tarjeta.addEventListener('click', () => obtenerDetallesPokemon(pokemon));
    listaPokemonsElemento.appendChild(tarjeta);
  });
}

function mostrarModal(pokemon) {
  tituloModalElemento.textContent = pokemon.name;
  imagenModalElemento.innerHTML = `<img src="${pokemon.ThumbnailImage}" alt="${pokemon.name}">`;
  detallesModalElemento.innerHTML = `
    <p>Número: ${pokemon.number}</p>
    <p>Habilidades: ${pokemon.abilities}</p>
    <p>Altura: ${pokemon.height} cm</p>
    <p>Peso: ${pokemon.weight} kg</p>
    <p>Tipo: ${pokemon.type.join(', ')}</p>
    <p>Debilidades: ${pokemon.weakness.join(', ')}</p>
  `;
  modalElemento.style.display = 'block';
}

modalElemento.addEventListener('click', evento => {
  if (evento.target.className === 'modal' || evento.target.className === 'cerrar') {
    modalElemento.style.display = 'none';
  }
});

obtenerDatosPokemons();