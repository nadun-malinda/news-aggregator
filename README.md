# News Aggregator Frontend App with ReactJS

## Live Preview

Deployed on Vercel:  
[https://news-aggregator-cyan-mu.vercel.app/](https://news-aggregator-cyan-mu.vercel.app/)

> **Note:** Some functionalities may be limited in the production preview due to API restrictions.

---

## Tech and Tools

- **TypeScript**
- **ReactJS**
- **Redux / Redux Toolkit / RTK Query**
- **Tailwind CSS**
- **ShadCN**
- **Docker**
- **Jest / React Testing Library**
- **ESLint**

---

## Project Structure Breakdown

```pl
news-aggregator/
├── public/                # Static assets such as images, fonts, and favicon
├── src/                   # Main source code for the application
│   ├── __mocks__/         # Mock files for testing
│   ├── components/        # Components used in the app
│   │   ├── filters/       # Components for filtering articles after search
│   │   ├── forms/         # Form components for user input
│   │   ├── layout/        # Shared layout components
│   │   ├── news/          # News article display components
│   │   ├── personalize/   # Components for personalized news feed
│   │   ├── search/        # Components for search functionality
│   ├── pages/             # Top-level pages of the application
│   │   ├── NewsFeedPage.tsx   # Main news feed page
│   │   ├── SearchPage.tsx     # Page for article search
│   ├── services/          # API service files for interacting with external news sources
│   │   ├── endpoints/     # Handlers for individual news APIs
│   │   │   ├── fetchGuardianNews.ts   # The Guardian API
│   │   │   ├── fetchNewsAPINews.ts    # News API
│   │   │   ├── fetchNYTNews.ts        # New York Times API
│   │   ├── aggregatedNewsApi.ts       # Combines and aggregates data from all APIs
│   ├── shared/            # Shared utilities, constants, and hooks
│   │   ├── config/        # Configuration files
│   │   ├── consts/        # Application-wide constants
│   │   ├── hooks/         # Custom React hooks
│   │   ├── ui/            # Shared UI components
│   │   ├── utils/         # Utility functions
│   ├── state/             # Redux store and slices for global state management
│   │   ├── articleSlice.ts        # Articles slice
│   │   ├── filterSlice.ts         # Filters slice
│   │   ├── savedFilterSlice.ts    # Personalized filters slice
│   │   ├── searchSlice.ts         # Search slice
│   │   ├── store.ts               # Redux store setup
│   ├── types/             # TypeScript type definitions
│   │   ├── article.ts     # News article types
│   │   ├── category.ts    # News categories
│   │   ├── source.ts      # News sources
│   ├── App.tsx            # Root React component
│   ├── App.test.tsx       # Unit tests for the app
│   ├── index.css          # Global styles
│   ├── index.tsx          # Entry point of the app
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
├── .dockerignore          # Excluded files for Docker
├── .env.example           # Example environment variables file
├── .env.local             # Local environment variables
├── .eslintrc.js           # ESLint configuration
├── docker-compose.yml     # Docker Compose setup
├── Dockerfile             # Docker container configuration
├── tailwind.config.js     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
├── yarn.lock
```

## Obtain API Keys

This project consumes three public news APIs (The Guardian, The New York Times, NewsAPI) to fetch data from. To run the project localy, you have to obtain relevant API Keys from the API providres.

#### The New York Times

1. Follow the instrcutions in the "Get Started" section in The New York Times Developer Portal [here](https://developer.nytimes.com/get-started)
2. After verifying your email, sign in again.
3. Then then you hav eto register your app. To do that, click on your email (top right coner) and then "Apps" [here](https://developer.nytimes.com/my-apps)
4. Here you can add your app name
5. Important: Make sure to `enable` the `Article Search API` in the APIs section.
6. Upon suuceesfull form save, you can get the API key!

#### The Guardian

1. Register for The Guardian News API [here](https://bonobo.capi.gutools.co.uk/register/developer)
2. Then obtain an API Key

#### NewsAPI

1. Register for NewsAPI API Key [here](https://newsapi.org/register)
2. After successful registration, you'll get your API Key.

## Project setup

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/news-aggregator.git

   cd news-aggregator
   ```

2. Create a `.env.local` file in the root directory. Copy the content from `.env.example` and add the relevant API keys obtained in the previous step.

## Up and Run the Project

This project is containerized. You can run it locally using `Docker` or `Yarn`.

### Using Docker

This project is containarized using Docker and can be run using Docker Compose comands:

1. Build and start the project:

   ```bash
   docker-compose up --build
   ```

2. Stop the project:

   ```bash
   docker-compose down
   ```

### Using Yarn

1. Install dependencies
   ```bash
   yarn install
   ```
2. Start the development server
   ```bash
   yarn start
   ```

## Access the project:

The application will be available at:

http://localhost:3000/ 🚀
