## Demo Video

Watch the demo: [https://youtu.be/sfyqZmu1GeM](https://youtu.be/sfyqZmu1GeM)

## Deploy

- Swagger API: [train-api.danlutsevych.online/docs](https://train-api.danlutsevych.online/docs#/)
- Admin panel: [train-admin.danlutsevych.online](https://train-admin.danlutsevych.online/)

## Train App — Monorepo (API, Admin, Mobile App)

A small monorepo that includes a NestJS API, a web Admin dashboard, and a React Native (Expo) mobile app for browsing stations, trains, and schedules with favorites.

### Structure

- `api/`: NestJS backend (TypeScript, TypeORM, PostgreSQL)
- `admin/`: Web admin (Vite + React + TypeScript)
- `app/`: React Native app (Expo + TypeScript)

## Technologies Used (EN)

### Backend (api/)

- **NestJS**: modular server framework
- **TypeORM**: ORM for PostgreSQL
- **PostgreSQL**: primary database
- **@dataui/crud / @dataui/crud-typeorm**: automatic CRUD controllers/services
- **JWT (nest/jwt)**: authentication
- Modules: `auth`, `user`, `station`, `route`, `train`, `schedule`, `favorite`

### Admin (admin/)

- **Vite + React + TypeScript**
- **Refine/shadcn-like UI kit** under `src/components`
- Routing and CRUD pages for domain modules

### Mobile App (app/)

- **Expo + React Native + TypeScript**
- **expo-router** for navigation
- **nativewind (Tailwind CSS for RN)** for styling
- **@tanstack/react-query** for data fetching/caching
- **axios** for HTTP requests (configured in `utils/axiosInstance.ts`)
- **lucide-react-native** icons wrapped with `components/ui/icon`
- **React Native Reusables**: shared UI primitives (Button, Card, Text, Separator, Icon, EmptyList)

## App Components Used (EN)

- Feature cards
  - `components/cards/schedule-card.tsx`: schedule info (destination, times, platform, favorite)
  - `components/cards/station-card.tsx`: station tile
  - `components/cards/train-card.tsx`: train tile
- Actions
  - `components/buttons/save-route-button.tsx`: Save to favorites (React Query mutation; filled/outlined heart)
- UI primitives
  - `components/ui/button.tsx`, `card.tsx`, `text.tsx`, `separator.tsx`, `icon.tsx`
  - `components/ui/empty-list.tsx`: reusable FlatList empty state

## Backend Endpoints (EN)

- `GET /schedule`: list schedules (joins route/train). Example filters:
  - Departures by station: `?filter=route.originStation.id||$eq||{stationId}`
  - Arrivals by station: `?filter=route.destinationStation.id||$eq||{stationId}`
  - All for station (either): combine filters with `or`
- `POST /favorite`: create favorite `{ schedule: { id } }`
- `GET /favorite?filter=schedule.id||$eq||{id}`: check if a schedule is favorited

---

## Технології (UKR)

### Backend (api/)

- **NestJS**: модульний серверний фреймворк
- **TypeORM**: ORM для PostgreSQL
- **PostgreSQL**: основна база даних
- **@dataui/crud / @dataui/crud-typeorm**: автогенерація CRUD-контролерів/сервісів
- **JWT (nest/jwt)**: автентифікація
- Модулі: `auth`, `user`, `station`, `route`, `train`, `schedule`, `favorite`

### Адмін-панель (admin/)

- **Vite + React + TypeScript**
- **Refine/shadcn-подібний UI набір** у `src/components`
- Маршрути та сторінки для CRUD по сутностях

### Мобільний застосунок (app/)

- **Expo + React Native + TypeScript**
- **expo-router** для навігації
- **nativewind (Tailwind для RN)** для стилів
- **@tanstack/react-query** для запитів/кешу
- **axios** для HTTP (налаштовано в `utils/axiosInstance.ts`)
- **lucide-react-native** іконки через обгортку `components/ui/icon`
- **React Native Reusables**: спільні UI-примітиви (Button, Card, Text, Separator, Icon, EmptyList)

## Компоненти застосунку (UKR)

- Карти (Cards)
  - `components/cards/schedule-card.tsx`: розклад (пункт призначення, часи, платформа, «в обране»)
  - `components/cards/station-card.tsx`: станція
  - `components/cards/train-card.tsx`: поїзд
- Дії
  - `components/buttons/save-route-button.tsx`: додати в обране (React Query мутація; заповнене/контурне серце)
- UI-примітиви
  - `components/ui/button.tsx`, `card.tsx`, `text.tsx`, `separator.tsx`, `icon.tsx`
  - `components/ui/empty-list.tsx`: порожній стан для FlatList

## Ендпоїнти (UKR)

- `GET /schedule`: список розкладів (з приєднанням route/train). Приклади фільтрів:
  - Відправлення зі станції: `?filter=route.originStation.id||$eq||{stationId}`
  - Прибуття на станцію: `?filter=route.destinationStation.id||$eq||{stationId}`
  - Усі для станції (або-або): комбінувати фільтри через `or`
- `POST /favorite`: створити «в обране» `{ schedule: { id } }`
- `GET /favorite?filter=schedule.id||$eq||{id}`: перевірити, чи додано до обраного

## To Do

- Add favorites list screen on mobile (view/remove favorites)
- Pagination and search for schedules and stations
- Offline cache for last schedules (React Query persist)
- Push notifications for saved routes (departures/alerts)
- Role-based access and guards in Admin
- E2E and unit tests (API and App)
- CI/CD pipelines and Docker images
- i18n for mobile and admin (EN/UKR)

## План робіт (UKR)

- Екран обраного у мобільному (перегляд/видалення)
- Пагінація та пошук для розкладів і станцій
- Офлайн-кеш останніх розкладів (React Query persist)
- Push-сповіщення для збережених маршрутів
- Ролі та гардии у Адмін-панелі
- E2E та unit тести (API і застосунок)
- CI/CD пайплайни та Docker образи
- Локалізація (EN/UKR) для мобільного та адмінки
