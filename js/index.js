/**
 * Para este ejercicio estaremos utilizando un arreglo de vehículos, dicho arreglo sera utilizado tanto en el formulario
 * para registrar un vehículo como en nuestro archivo html que muestra la lista de vehículos, para lograr que la información
 * persista guardaremos nuestro arreglo de vehículos en "localStorage", de este modo los cambios que hagamos estarán disponibles.
 */

/**
 * Inicialmente crearemos nuestro arreglo de vehículos, lo que haremos sera asignarle los datos a este arreglo en base a los datos
 * que tengamos en nuestro localStorage, por ende traeremos ese arreglo de vehículos y lo asignaremos a nuestra variable arrayVehiculos.
 */

let arrayVehiculos = JSON.parse(localStorage.getItem('vehiculos')); 

/**
 * En este bloque comprobaremos que nuestro arreglo tenga la información que deseamos, hemos supuesto que tenemos un arreglo con información
 * en nuestro localStorage, pero en caso de no existir mencionada información, entonces lo que haremos es crearla y de este modo tener una base
 * para trabajar el ejercicio.
 *
 * El siguiente bloque condicional comprobara que el arreglo este vació, en caso de estarlo, asignara la información codificada al arreglo de
 * vehículos.
 */

if (arrayVehiculos === null){
  arrayVehiculos = [
  
    {
      marca: "marca1",
      modelo: "modelo1",
      anio: "2000",
      color: "Rojo"
    },
    {
      marca: "marca2",
      modelo: "modelo2",
      anio: "2002",
      color: "Azul"
    },
    {
      marca: "marca3",
      modelo: "modelo3",
      anio: "2003",
      color: "Amarillo"
    },
    {
      marca: "marca4",
      modelo: "modelo4",
      anio: "2004",
      color: "Rosado"
    },
    {
      marca: "marca5",
      modelo: "modelo5",
      anio: "2005",
      color: "Gris"
    }
  ];
}

/**
 * aqui accedemos al document.
 * utilizamos el selector 'getElementById' el cual recibe el id del nodo o elemento
 * del document que queremos accesar.
 * y  utilizamos el metodo addEventListener() el cual sirve para escuchar y recibe 2 argumentos
 * 1er argumento es el nombre del evento que pondremos a escuchar
 * 2do argumento es una expresion funcion anonima o tambien puede recibir una funcion arrow
 */
document
  .getElementById("registrar-form") // "registrar-form" es el id de nuestro formulario
  .addEventListener("submit", function (event) {
    /**
     * (event)  hace referencia al evento que se captura tambien es habitual usar (e)
     * event.preventDefault() se utiliza para evitar que el evento se ejecute por default
     * al cargar la pagina evitando que se envie el formulario vacio.
     */
    event.preventDefault();

    // hacemos el llamado a nuestra funcion registrarVehiculo()
    registrarVehiculo()
  });

function registrarVehiculo() {
  /**
   *  Guardamos en constantes los nodos que contienen los datos que iremos trabajando, en este caso los nodos con los respectivos
   *  campos del vehículo,tendremos un nodo mensajeResultado para modificar su contenido y mostrar un mensaje este nodo esta identificado
   *  con el id='resultado,también guardamos el nodo donde mostraremos un mensaje de error en caso de que el usuario envié el formulario vació.
   */ 

  const nodoMarca = document.getElementById("marca");
  const nodoModelo = document.getElementById("modelo");
  const nodoAnio= document.getElementById("anio");
  const nodoColor= document.getElementById("color");
  const mensajeResultado = document.getElementById("resultado");
  
  let nodoErrorMsn = document.getElementById("errorMsn");

  /**
   * Crearemos unas variables que contengan los valores de los nodos anteriores para posteriormente crear nuestro objeto vehículo,
   * accedemos a la propiedad (.value) del nodo la cual guarda el valor en texto (string) ingresado por el usuario y lo guaramos
   * en las respectivas variables
   */

  const marca = nodoMarca.value;
  const modelo  = nodoModelo.value;
  const anio   = nodoAnio.value; 
  const color  = nodoColor.value;



  /**
   * validaremos que los campos no se encuentren vacíos.
   * en la expresión la expresión (===) se valida si las comparaciones son iguales
   * si se cumple la condición sera suficiente para mostrar el mensaje de error
   */


  let mensaje;

  if (marca === "" || modelo === "" || anio === ""|| color === "")  {
    mensaje = "No se permiten <strong>campos vacios</strong>";

    /**
     * hacemos el llamado a nuestra función showMsnError() que sera la encargada
     * de mostrar el mensaje de error
     * esta recibe como argumentos el mensaje de error que deberá mostrar
     * y el nodo nodoErrorMsn donde se mostrara el mensaje que se enviá
     */

    showMsnError(mensaje, nodoErrorMsn);

  } 

   /**
   * Entonces si no se encuentran errores por campos vacíos se procederá en este bloque else
   * a ejecutar la lógica para crear un objeto vehículo, guardarlo en un arreglo de vehículos y
   * posteriormente mostrarlo su información en la vista.
   */

  else {
    
    /**
     * Crearemos nuestro objeto usando la notación JSON y asignaremos los valores a las propiedades del objeto
     * usando las variables anteriormente creadas, marca, modelo, anio, color.
     */


    const vehiculo = {
      marca: marca, //>> Marca  del vehiculo ingrasada mediante el formulario
      modelo: modelo, //>> Modelo del vehiculo ingrasada mediante el formulario
      anio: anio, //>> Año    del vehiculo ingrasada mediante el formulario
      color: color //>> Color  del vehiculo ingrasada mediante el formulario
    }

   /**
     * Agregaremos nuestro objeto vehículo a array de vehículos usando el método push() y enviado como argumento el
     * objeto vehículo que hemos creado.
     */
    
    arrayVehiculos.push(vehiculo);

    /**
     * Para finalizar la lógica de nuestro ejercicio crearemos un mensaje de éxito, con los detalles del vehículo, este mensaje
     * sera el valor de la propiedad innerHTML de nuestra nodo mensajeResultado, y con esto tendremos en la vista dicho mensaje.
     *
     * Usaremos un template string, esto lo podemos realizar mediante el uso de  backticks (`) de esta forma podemos dar un formato
     * y adicionalmente para mejorar la lectura podemos realizar la interpolación de string usando placeholders "${expression}", esto
     * nos permite el uso de expresiones y conservar un formato mas limpio.
     */
  
    const mensajeExitoso = `Registro exitoso!<br>Detalle del vehiculo:<br>
                            Marca:  ${marca}<br>
                            modelo: ${modelo}<br>
                            anio:   ${anio}<br>
                            color:  ${color}<br>`
  
    mensajeResultado.innerHTML= mensajeExitoso;

    /**
     * Una ves registrado el vehículo, procederemos a realizar la persistencia de la información, crearemos y guardaremos el arreglo en el localStorage
     * sera guardado con el nombre 'vehículos' y lo guardaremos en formato JSON, para ellos usaremos el método "stringify()" y como argumento nuestro arreglo
     * de vehículos.
     */

    localStorage.setItem('vehiculos', JSON.stringify(arrayVehiculos));

    /**
     * En este punto lo que haremos es navegar hacia nuestro archivo hmtl que contiene la tabla para mostrar vehículos, esta navegación se hará automáticamente
     * después de realizar el registro exitoso del vehículo, en este caso vamos a esperar dos segundos para visualizar el cambio entre archivos.
     * Esta espera es totalmente opcional solo lo haremos para poner en practica el método "setTimeout()" y también para tiene dos segundos para leer el mensaje
     * de registro exitoso.
     */

    setTimeout(function(){
        window.location.href = "/components/table.html";
    },2000)
    
    
}

function showMsnError(mensajeError, nodoErrorMsn) {
  /**
   * en nuestro nodoErrorMsn accedemos al metodo .setAttribute()
   * el cual recibe como primer argumento el nombre de la propiead html que desamos modificar
   * para este caso vamos modificar la propiedad 'class' y como segundo argumento
   * enviamos las clases de estilo que seran asignadas a la propiedad 'class' en este caso
   * asignaremos algunas clases de estilos pertenecientes al framework de estilos boostrap
   * bg-danger --> genera un fondo rojo
   * rounded-3 --> redondea las esquinas
   * mb-2 ---> margin-bottom agrega un margen en la parte inferior del nodoErrorMsn
   * p-2 ---> agrega un padding alrededor de todo el nodoErrorMsn
   *
   */

  nodoErrorMsn.setAttribute("class", "bg-danger rounded-3 mb-2 p-2");
  /**
   * modificamos el nodoErrorMsn accediendo a su propiedad .innerHTML
   * la cual nos permite utilizar la sintaxis html para crear etiquetas
   * desde javaScript en este caso crearemos una etiqueta 'strong'
   * para poner en negrita la palabra campos vacios
   */
  nodoErrorMsn.innerHTML = mensajeError;

  /**
   * utilizamos la instruccion de return para romper el flujo de nuestra aplicacion
   * y evitar que se continue ejecutando el codigo que pueda seguir
   */
  return;
}
}