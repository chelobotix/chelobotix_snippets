# Chelobotix Snippets

Colección personal de snippets de ingeniería de software, presentados como páginas HTML estáticas generadas desde archivos Markdown.

## Estructura del proyecto

```
Chelobotix_Snippets/
├── build.js          # Script de generación (Node.js)
├── package.json      # Dependencia: marked
├── index.html        # Landing page (generado por build.js, NO editar a mano)
└── snippets/
    └── <Categoria>/
        ├── <Nombre>.md    # Fuente del snippet (editar aquí)
        └── <Nombre>.html  # Página renderizada (generada por build.js)
```

## Cómo agregar un snippet

### Proceso manual (sin Claude)

1. Crear el archivo Markdown en la carpeta de la categoría correspondiente:
   ```
   snippets/<Categoria>/<Nombre>.md
   ```
   Si la categoría no existe, crear la carpeta — el script la detecta automáticamente.

2. Escribir el snippet en Markdown estándar. Ejemplo mínimo:
   ```markdown
   # Título del Snippet

   Descripción breve (opcional).

   ```shell
   git rebase -i HEAD~5
   ```
   ```

3. Ejecutar el build:
   ```bash
   node build.js
   # o
   npm run build
   ```

4. Abrir `index.html` en el navegador — el nuevo snippet ya aparece enlazado.

### Proceso con ayuda de Claude

El flujo esperado es el siguiente:

1. **El usuario** crea manualmente el archivo `.md` dentro de la carpeta de la categoría:
   ```
   snippets/<Categoria>/<Nombre>.md
   ```

2. **El usuario** pide a Claude que procese el nuevo snippet (ej: *"procesa el nuevo snippet que acabo de crear en Git/Force-Push.md"*).

3. **Claude** debe:
   - Ejecutar `node build.js` para generar `snippets/<Categoria>/<Nombre>.html`
   - El mismo comando regenera `index.html`, actualizando automáticamente:
     - El listado de la categoría correspondiente
     - El buscador (`Ctrl+K`), que lee del array `const ALL` embebido en `index.html`

> **Nota:** No existe un `snippets.json` propio del proyecto web. El índice de búsqueda vive embebido en `index.html` como `const ALL = [...]` y se regenera en cada build. El archivo `snippets.json` en la raíz es un export de una app externa (Snippets Lab) y no forma parte del sistema de generación.

## Convención de nombres de archivos

El nombre del archivo `.md` se convierte en el título visible según estas reglas:

| Patrón en el nombre | Se convierte en |
|---------------------|-----------------|
| `-_` o `_-`         | ` - `           |
| `-`                 | ` ` (espacio)   |
| `_`                 | ` ` (espacio)   |

Ejemplos:
- `Rebase-_Squash.md` → **Rebase - Squash**
- `Cherry-Pick.md` → **Cherry Pick**
- `Force-Push-_With-Lease.md` → **Force Push - With Lease**

## Dependencias

- **marked** (`npm install`) — convierte Markdown a HTML en el build
- **highlight.js** (CDN) — resaltado de sintaxis en el browser, sin instalación

## Lo que genera `build.js`

- `index.html` — landing page con todos los snippets agrupados por categoría
- `snippets/<Categoria>/<Nombre>.html` — página individual por cada `.md`

> `index.html` es completamente regenerado en cada build. No editarlo a mano.
