# Vue 3 Frontend — Product Manager

A production-structured Vue 3 + Vite frontend that connects to the Express + JWT backend.

## Folder Structure

```
vue-frontend/
├── src/
│   ├── api/
│   │   ├── axios.js          # Axios instance + interceptors
│   │   ├── auth.js           # Auth API calls
│   │   └── products.js       # Products API calls
│   ├── composables/
│   │   └── useAuth.js        # Reusable auth composable
│   ├── stores/
│   │   ├── authStore.js      # Pinia auth store (JWT, user session)
│   │   └── productsStore.js  # Pinia products store (CRUD + state)
│   ├── router/
│   │   └── index.js          # Vue Router + navigation guard
│   ├── components/
│   │   ├── AppNav.vue        # Top navbar
│   │   ├── AlertMessage.vue  # Reusable error/success alert
│   │   └── ProductCard.vue   # Product display card
│   ├── views/
│   │   ├── LoginView.vue     # Login page
│   │   ├── RegisterView.vue  # Register page
│   │   ├── DashboardView.vue # Product listing
│   │   └── ProductForm.vue   # Create / Edit product (shared form)
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
├── package.json
└── .env.example
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env

# 3. Start the development server
npm run dev
```

Make sure your Express backend is running at `http://localhost:5000` before starting the frontend.

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Architecture Notes

### Data Flow
```
View → composable/store action → api module → Axios instance → Express backend
```

### Key Design Decisions

- **`src/api/`** — Pure HTTP functions only. No state, no UI logic.
- **`src/stores/`** — Pinia stores own the data state and loading/error flags.
- **`src/composables/useAuth.js`** — Thin wrapper over the auth store that adds local loading/error state for form pages, and redirects on success.
- **`ProductForm.vue`** — Handles both create and edit using the `:id` route param. If the param exists, it fetches and pre-fills the form.
- **Axios interceptors** — The request interceptor automatically attaches the JWT; the response interceptor clears the session and redirects on a 401.
- **`storeToRefs()`** — Used when destructuring from Pinia stores to preserve reactivity.

## Routes

| Path                  | View              | Protected |
|-----------------------|-------------------|-----------|
| `/login`              | LoginView         | No        |
| `/register`           | RegisterView      | No        |
| `/dashboard`          | DashboardView     | Yes       |
| `/products/new`       | ProductForm       | Yes       |
| `/products/:id/edit`  | ProductForm       | Yes       |
