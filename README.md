# Nimble Gravity — Job Application Challenge

Mini aplicación React desarrollada como parte del proceso de selección para el rol de **Junior Fullstack Developer** en [Nimble Gravity](https://www.nimblegravity.com/).

---

## Descripción

La app se conecta a la API de Nimble Gravity para:

- Obtener los datos del candidato a partir de su email
- Listar las posiciones abiertas disponibles
- Permitir postularse a una posición enviando la URL del repositorio de GitHub

---

## Stack

- **React 18** con Vite
- Fetch API nativa (sin librerías externas de HTTP)
- CSS custom (sin frameworks de UI)

---

## Estructura del proyecto

```
src/
├── assets/             # Imágenes estáticas (logo, foto de perfil)
├── components/
│   ├── CandidateCard.jsx   # Tarjeta con datos del candidato
│   ├── JobItem.jsx          # Posición individual con input y botón Submit
│   └── JobList.jsx          # Lista paginada con buscador
├── hooks/
│   └── useCandidateData.js  # Fetching inicial en paralelo (candidato + jobs)
├── services/
│   └── api.js               # Capa de acceso a la API
├── App.jsx
├── main.jsx
└── index.css
```

---

## Cómo levantar el proyecto

### Requisitos previos

- Node.js >= 18
- npm >= 9

### Instalación

```bash
# Cloná el repositorio
git clone https://github.com/JuanKarabin/nimble-gravity.git
cd nimble-gravity

# Instalá las dependencias
npm install

# Levantá el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

### Build para producción

```bash
npm run build
npm run preview
```

---

## Funcionalidades implementadas

| Requisito | Estado |
|---|---|
| React como framework | Hecho |
| GET candidato por email | Hecho |
| GET listado de posiciones | Hecho |
| Listado de posiciones con input y botón Submit | Hecho |
| POST postulación con body correcto | Hecho |
| Estados de carga y error en la UI | Hecho |
| Buscador por título de posición | Extra |
| Paginado de 5 posiciones por página | Extra |

---

## API

**Base URL:** `https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/candidate/get-by-email?email=` | Obtiene datos del candidato |
| GET | `/api/jobs/get-list` | Lista de posiciones abiertas |
| POST | `/api/candidate/apply-to-job` | Envía la postulación |
