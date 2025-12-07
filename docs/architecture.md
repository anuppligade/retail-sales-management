# Retail Sales Management System — Architecture

## Project Structure
The project follows a monorepo structure:

- backend/ — Node.js + Express + MongoDB
- frontend/ — React.js + Zustand + React Router
- docs/ — Documentation

## Backend Architecture
- MVC pattern (Controllers, Services, Models)
- Express routing
- MongoDB for data storage
- Filtering, sorting, pagination built on Mongo queries

## Frontend Architecture
- React components for UI
- Zustand for global state management
- React Router for navigation
- Axios for API calls

## Data Flow
User → Frontend → API → Backend → MongoDB → Backend → Frontend → UI Update
