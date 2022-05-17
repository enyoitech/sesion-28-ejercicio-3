/**
 * Para este ejercicio estaremos utilizando un arreglo de vehículos, dicho arreglo sera utilizado tanto en el formulario
 * para registrar un vehículo como en nuestro archivo html que muestra la lista de vehículos, para lograr que la información
 * persista guardaremos nuestro arreglo de vehículos en "localStorage", de este modo los cambios que hagamos estarán disponibles.
 */

/**
 * Inicialmente crearemos nuestro arreglo de vehículos, lo que haremos sera asignarle los datos a este arreglo en base a los datos
 * que tengamos en nuestro localStorage, por ende traeremos ese arreglo de vehículos y lo asignaremos a nuestra variable arrayVehiculos.
 */

const arrayVehiculos = JSON.parse(localStorage.getItem('vehiculos'));

/**
 * Guardaremos en nodo que contiene la tabla de nuestro html, y lo asignaremos a la variable "tabla", posteriormente modificaremos esa
 * tabla de modo que le agregaremos filas con informacion de vehiculos. 
 * 
 * Aclararemos que el id pertecene a al cuerpo de la tabla y no a la totalidad de la tabla.
 */


const tabla = document.getElementById('tabla-vehiculos')


/**
 * Haremos el llamadoa nuestro metodo cargarTabla(), metodo que se encarga de ponerle contenido a dicha tabla que sera mostrada en la vista
 */
 
cargarTabla();




/**
 * Después de cargar la tabla con datos añadiremos el eventListener() a todos los botones de la clase eliminar, para ello guardaremos todos los botones
 *  en una variable utilizando un selector de clase getElementsByClassName("btn-eliminar") y mediante un ciclo recorreremos este arreglo de 
 * botones para agregar el evento click y la función manejadora de este evento, en este caso al hacer click en el botón lo que buscamos es que se elimine
 * el elemento de la tabla, estaremos eliminando la fila. 
 */


 const btnsEliminar = document.getElementsByClassName("btn-eliminar");

 for (let index = 0; index < btnsEliminar.length; index++) {
      btnsEliminar[index].addEventListener("click",eliminarVehiculo)
   
 }


 /**
 * Este evento se asignara al botón regresar, el botón tiene un id bajo el mismo nombre, agregaremos una pequeña lógica
 * que nos envié al la pagina anterior a esta, en este caso nos enviara nuevamente al formulario de vehículos. 
 */

document
  .getElementById("regresar")
  .addEventListener("click", function (event) {
    /**
     * (event)  hace referencia al evento que se captura tambien es habitual usar (e)
     * event.preventDefault() se utiliza para evitar que el evento se ejecute por default
     * al cargar la pagina evitando que se envie el formulario vacio.
     */
    event.preventDefault();

    localStorage.setItem('vehiculos', JSON.stringify(arrayVehiculos));
    window.location.href ="./../index.html";
  });
 
  /**
   * En este bloque tenemos la función que llena la tabla html, la lógica del cuerpo de esta función es la siguiente;
   * 
   * Se recorrerá mediante un ciclo for el arreglo de vehículos ("arrayVehiculos"),el ciclo se realizara en función del 
   * tamaño del mencionado arreglo, usaremos la propiedad "length" de nuestro arreglo para determinar su tamaño.
   * 
   * Lo siguiente que haremos es crear una variable "fila" dicha variable tendrá el contenido hmtl para crear la fila 
   * y posteriormente agregarla al cuerpo de la tabla.
   * 
   * Usaremos un template String para ello usamos backticks (`), de esta forma interpolaremos los datos de cada objeto vehículo,
   * accederemos a las propiedades de cada vehículo con las iteraciones del ciclo y posteriormente finalizaremos agregando el 
   * contenido de la variable fila a la tabla.
   */

  
function cargarTabla(){

  

  for (let index = 0; index < arrayVehiculos.length; index++) {
      let fila = `<tr>
                      <th scope="row"></th>
                      <td>${arrayVehiculos[index].marca}</td>
                      <td>${arrayVehiculos[index].modelo}</td>
                      <td>${arrayVehiculos[index].anio}</td>
                      <td>${arrayVehiculos[index].color}</td>
                      <td>
                      <img class='btn btn-danger btn-eliminar' src="./../img/trash3.svg" alt="eliminar">
                      </td>
                  </tr>`
       tabla.innerHTML += fila;            


    
  }
  

}  

/**
 * Aquí tendremos nuestra función eliminar, dicha función recibirá el evento necesario para desarrollar nuestra lógica,
 * lo primero que se realizara en esta función es capturar la fila donde se ha hecho click al botón eliminar,
 * Nuestro botón esta contenido en la siguiente estructura:
 * 
 * <tr>
      <td>
      <img class='btn btn-danger btn-eliminar' src="./../img/trash3.svg" alt="eliminar">
      </td>
 * </tr>
 * 
 * Entonces utilizando la propiedad "event.target.parentNode" estaríamos accediendo al componete padre del botón, este componente
 * padre es un elemento <td>, pero no es el elemento que necesitamos, en nuestro caso necesitamos la fila, entonces tendremos 
 * que acceder al elemento padre del <td> "event.target.parentNode.parentNode", de esta forma ya tendríamos la fila en la que 
 * tenemos el botón.
 */

function eliminarVehiculo(event){
  const filaSelecionada = event.target.parentNode.parentNode;
/**
 * usaremos la propiedad "rowIndex" para acceder al indice de la fila, por defecto nos devolverá un indice empezando en la posición 1,
 * pero como esto es un arreglo y el indice inicial de un arreglo es 0, le vamos a restar 1 posición para tener el indice correcto.
 */
  const indexFila = filaSelecionada.rowIndex - 1;
  
  /**
   * A continuación utilizaremos el método deleteRow() de nuestra tabla y le pasaremos el indice de la fila que vamos a borrar, indice que tenemos 
   * guardado en nuestra variable "indexFila", este indice también lo utilizaremos para borrar el elemento de nuestro arreglo de vehículos,
   * esto lo llevaremos a cabo con el método splice(), método que tiene como parámetros la posición y la cantidad, le enviaremos la posiciona
   * del elemento a borrar y le diremos que un solo elemento "arrayVehiculos.splice(indexFila,1)"
   */
  tabla.deleteRow(indexFila);
  arrayVehiculos.splice(indexFila,1);
   
}


