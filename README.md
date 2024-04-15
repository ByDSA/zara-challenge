# General
Aplicación web Front-end para obtener información sobre
diferentes personajes de Marvel. Creada con NextJS usando principalmente CSR (Client Side Rendering), aunque algunas partes de las vistas se generan con SSR (Server Side Rendering).

La aplicación está desplegada aquí: https://zara-challenge-marvel.netlify.app/

# Instalación y uso
## Descarga e instalación
- Clonar este repositorio:

```sh
git clone https://github.com/ByDSA/zara-challenge
```

- Instalar las dependencias del proyecto. Se usa `pnpm` como gestor de paquetes. ([Instalación de pnpm](https://pnpm.io/installation)).
```sh
pnpm install
```

## Variables de entorno
Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables de entorno:
```
NEXT_PUBLIC_MARVEL_PUBLIC_KEY=*********
```
Cambiar el valor de `NEXT_PUBLIC_MARVEL_PUBLIC_KEY` por la clave pública de la API de Marvel. La documentación se puede consultar en este [enlace](https://developer.marvel.com/documentation/getting_started).

## Ejecución del proyecto en modo desarrollo
```sh
pnpm dev
```
Será accesible en `http://localhost:3000/`. El puerto puede no ser `3000` si ya está ocupado; se asignará el primer puerto disponible secuencialmente (ej: `3001`).

También tiene un modo de depuración definido en `.vscode/launch.json` para Visual Studio Code. Dentro del editor, se puede ejecutar con `F5`  o desde la pestaña de `Ejecución y depuración` del editor.

## Building y ejecución en modo producción
```sh
pnpm build && pnpm start
```
La aplicación estará accesible en `http://localhost:3000/`.

# Arquitectura y estructura
He utilizado NextJS para la creación de la aplicación.

Para el CSS he usado CSS Modules. Tanto a nivel de las vistas como de los componentes, suele haber en su mismo nivel archivos `styles.module.css` que les aplica de forma aislada. También hay un archivo `global.css` que se aplica a toda la aplicación, especialmente para el uso de colores con variables CSS.

La estructura de carpetas es la siguiente:
```
- src/app: vistas de la aplicación.
  - layout.tsx: layout que comparten ambas vistas (el `<head>`).
  - page.tsx: vista 1. Junto a `page.e2e.spec.ts` para los tests end-to-end.
  - _layout: algunos componentes privados específicos para la vista 1.
  - detail/[id]: vista 2. Con la misma estructura de archivos que la vista 1.

- src/modules: módulos reutilizables, especialmente en el caso de que la aplicación escalara.
  - characters: listing (Card, CardList), search, Resume (usado en la vista 2), model, fetching, caché.
  - comics: estructura similar a characters. listing (Comic, ComicList), model, fetching, caché.
  - envs: funciones para facilitar el acceso a las variables de entorno.
  - icons: iconos SVG.
  - search: componente de búsqueda, utilizado para buscar characters.
  - utils.ts: funciones de utilidad que comparten varios módulos o las vistas.
```

He utilizado ESLint como linter y formateador. El archivo de configuración es `/eslint.config.mjs`, que hace uso también de los archivos de `/lib/eslint/*`. Además, utilizo la extensión de VSCode de Prettier para formatear los archivos CSS y JSON (no uso una configuración específica).

Dentro del código fuente, ante algunas decisiones técnicas, existen en algunos casos pequeños comentarios que justifican estas decisiones técnicas (no son comentarios que dividan o expliquen el código en sí).

## Persistencia de los datos
He utilizado LocalStorage para guardar los datos de los personajes favoritos.

También he persistido en LocalStorage a modo de caché (para evitar hacer peticiones a la API cada vez que se accede a la página) los datos de los personajes y de los comics que se han obtenido de la API.

# Testing
## Unitarios y de componente
He utilizado React Testing Library junto con Jest para los tests a nivel de componente. Los tests están junto al componente que testean, con extensión `.spec.tsx`.

Para ejecutar los tests:
```sh
pnpm test
```
## End-to-end
Para el testing end-to-end he utilizado Playwright. Los tests están en la misma carpeta que las páginas que testean, con extensión `.e2e.spec.ts`.

Para ejecutar, primero tiene que estar levantado el servidor en modo de producción:
```sh
pnpm build && pnpm start
```
o en modo de desarrollo:
```sh
pnpm dev
```
y después ejecutar los tests:
```sh
pnpm test:e2e
```
En `playwright.config.ts` he puesto que el puerto a utilizar en localhost sea el 3000. Si por lo que fuera estuviera ocupado, se puede cambiar en ese archivo.

# Otras consideraciones
## Cambio de protocolo en la URL de la API
El enunciado decía que las peticiones al API REST se tenían que realizar a `http://gateway.marvel.com/v1/`. Debido a que la aplicación está desplegada sobre HTTPS, me he visto obligado a cambiar el protocolo de la URL a `https://gateway.marvel.com/v1/` ya que, por seguridad, el navegador bloquea las peticiones con protocolo `http` desde webs `https`.

## Búsqueda por comienzo del nombre
En el enunciado también se decía, en el contexto de la funcionalidad de la Vista 1, que `Si se busca por “Spider” se deberían mostrar todos los nombres que
contengan dicha palabra`, y que `La búsqueda de personajes debe apoyarse en el filtrado de la API`. Como según la documentación del API sólo se puede filtrar, en el caso del nombre, con `name` (matching exacto de nombre) o `nameStartsWith` (inicio del nombre) y no por inclusión de la cadena dentro del nombre, he decidido hacer el filtrado únicamente usando el API,  usando `nameStartsWith`, aunque sólo muestre los personajes que empiecen por la cadena buscada.

# Cambios futuros
- Se podrían añadir más tests, especialmente end-to-end, para comprobar cada una de las especificaciones de funcionalidad que se dicen en el enunciado.