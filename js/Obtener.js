// Seleccionamos todas las categorías
const categoryItems = document.querySelectorAll(".category-item");

categoryItems.forEach(item => {
  item.addEventListener("click", (e) => {
    // Obtener la categoría desde el atributo data-category
    const category = e.currentTarget.getAttribute("data-category");

    // Usamos la categoría como palabra clave para la búsqueda
    keyword = category;
    page = 1;

    // Llamamos a la función de búsqueda
    buscarImagenes();
  });
});

//elementos del html
const formBusqueda = document.getElementById("form-busqueda");
const cajaBusqueda = document.getElementById("caja-busqueda");
const resultadoBusqueda = document.getElementById("resultado-busqueda");
const mostrarMas = document.getElementById("mostrar-mas");

let keyword = "";
let page = 1;
const accesskey = "gzLK3gIOpKO2Pu6mVNcLBgHPVgYlF3EH3-xFV72Tamo";

//funcion que trae los resultados de la busqueda
async function buscarImagenes() {
  //armar URL
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

  //realizar busqueda
  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    resultadoBusqueda.innerHTML = "";
  }

  // Coloco los resultados de la búsqueda en el contenedor
  const resultados = data.results;

  // Por cada resultado armo un enlace y dentro le agrego la imagen
  resultados.forEach((result) => {
    const imagen = document.createElement("img");
    imagen.src = result.urls.small;

    const imagenLink = document.createElement("a");
    imagenLink.href = result.links.html;
    imagenLink.target = "_blank";

    // Agrego el elemento
    imagenLink.appendChild(imagen);
    resultadoBusqueda.appendChild(imagenLink);

    mostrarMas.style.display = "block";
  });
  console.log(resultados); // Aquí mostramos los resultados completos en la consola

  // Después de cargar los resultados, hacer scroll suave a la sección
  resultadoBusqueda.scrollIntoView({ behavior: 'smooth' });
}

// Manejar el envío del formulario
formBusqueda.addEventListener("submit", (e) => {
  //evitar que se recargue la pagina
  e.preventDefault();
  page = 1;

  // Obtener valor de la caja de búsqueda
  keyword = cajaBusqueda.value;

  // Llamar función
  buscarImagenes();
});

// Mostrar más imágenes cuando se haga clic en "Mostrar más"
mostrarMas.addEventListener("click", () => {
  page++;
  buscarImagenes();
});
