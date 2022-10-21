![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Countries
## Sobre este proyecto.

<p align="left">
  <img height="400" src="./worldcountries.png" />
</p>


Este proyecto ha sido realizado como proyecto individual para ser evaluado en SoyHenry Bootcamp.Forma parte de las últimas etapas del bootcamp donde se ponen en práctica todo lo aprendido durante el mismo.

Está realizado en javascript con las siguientes tecnologías: 

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

Para la interface gráfica solo se usó CSS PURO.

## Como funciona


## BACKEND

Al momento de levantar el servidor con Node se obtienen los 250 paises que obtenemos de la peticion a la API RestCountries (https://restcountries.com/v3.1/all). Se extraen los datos necesarios y se introducen en una base de datos postgres utilizando sequelize. 

Extra: Para mejor experiencia de usuario al crear la base de datos se agregan por defecto 7 actividades y se relacionan con sus respectivos paises, esta info se encuentra en la ruta /api/extradb/activities.js

Luego de esto toda la aplicación no hace uso nunca más de la API y todas las peticiones se hacen directo a nuestra base de datos.

A partir de ahí tenemos las siguientes rutas funcionando con su respectiva informacion:

- GET /countries -
Devuelve todos los paises encontrados en la DB.

- GET /countries/{id} -
Devuelve el país que coincida con ese ID (o que simplemente empiece con ese ID)

- GET /countries?name={id} -
Devuelve el país que coincida con ese ID (Matcheo exacto exceptuando mayusculas y minusculas)

- GET /Activities -
Devuelve todas las actividades en la DB.

- GET /Activities/{id} -
Devuelve la actividad que coincida con ese ID (númerico)

- POST /Activities -
Recibe por body una actividad. Si la actividad ya existe en la DB simplemente se relacionaran los paises que vengan por body a dicha actividad.
En caso de que la actividad no exista, se creará con toda su info correspondiente.

## FRONTEND

La ruta principal llevara al landing el cual nos presenta un botón para ingresar al home.

- Filtros y ordenamiento -

  Dentro del home al cargar se renderizarán los 250 países de nuestra DB los cuales se podrán filtrar por nombre, continente, o actividad. Y se podrán ordenar por población (mayor y menor), por alfabeto (A-Z o Z-A).

  Dichos filtros se pueden superponer y mantener siempre el orden requerido. 
  Por ejemplo, podremos filtrar todos los paises que empiecen con A, sean de Europa, practiquen Surf, aplicarles el orden poblacional y seguirán activos mientras na
  veges por la página ya sea en el home o en el detalle de cada país.

- Navegación - 

  Se mostrarán 10 paises por pagina y avanzarán de diez en diez al avanzar la navegación. Se mostrarán los ultimos diez al clickear la doble flecha de avance.
  Lo mismo para retroceder.

- Detalle de cada pais.

  Nos mostrará algunos datos extra del país, incluido sus actividades relacionadas. Si no tiene actividad o queremos agregarle una, tendremos un boton que nos envia al formulario para crear la actividad para dicho país.

- Actividades -

  El botón "see all activities" en Home nos renderizará todas actividades en nuestra DB con su respectiva información. Podremos crear una actividad nueva o para cada actividad tendremos visible los paises asociados y un boton para agregarle paises a dicha actividad.

- Refresh y HenryFilter

  El boton refresh seteará todos los filtros y ordenamientos inactivos y volverá a hacer una nueva petición a la DB y renderizará los 250 paises nuevamente en su orden original.

  El boton "HenryFilter" está hecho en base a un requisito solicitado por el bootcamp que era de mostrar los primeros 9 paises en la hoja 1 de la navegación. y luego 10 por página.
  Al ser algo "antinatural" para la navegación decidi hacerlo en forma de filtro y al estar activo se verán de esa manera y al desactivarlo respondera a la navegación clásica de la App.

## FORMULARIO DE CREACION DE ACTIVIDAD.

  Se creará un estado local el cual será verificado mediante JavaScript antes de realizarse el post a la ruta /activities
  El nombre no permitirá carácteres especiales, números ni podrá ser menor a 3 letras o mayor a 15.
  Si se introdujera una actividad ya existente no se volverá a crear y simplemente se actualizará y se agregaran los paises a dicha actividad.

## TEST BACKEND Y MODELS.

  La app posee test para las rutas del backend y para los models de la base de datos.

  [] Models:

  - Activity -
    Se testea que la propiedad NAME pueda ser solo un string y que sean enviados los valores requeridos (name y difficulty).

  - Country -
    Se testea que la propiedad NAME sea valida (string y no vacía), que CAPITAL sea un string y que los campos requeridos esten completos (id, name y nameSpanish)

  [] Routes:

  - Ambas rutas (/activities, /countries) testean lo mismo:

    Se testea las respuestas del servidor, debería responder status 200 cuando se requiere una ruta válida y 404 cuando no exista.
    Tambien se testea la ruta /id donde se espera recibir status 200 cuando encuentra correctamente un ID en la db. Caso contrario devuelve 400.


## DEPLOY

  El deploy del servidor y base de datos de la APP fue realizado en Heroku
  - Ruta base:
    https://worldcountries-app.herokuapp.com/

  Para el frontend se usó vercel:
  - Ruta base:
    https://worldcountries-app.vercel.app/



