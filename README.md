# CountriesInfo

A React application that displays information about countries with a beautiful and responsive UI that supports dark mode.

## Features

- **Country Information**: Display detailed information about countries including:
  - Flag
  - Population
  - Region
  - Capital
  - Languages
  - Currencies
  - Border countries

- **Search and Filter**: Search for countries by name or filter by region
  - Fuzzy search using Fuse.js for better user experience
  - Instant filtering
  
- **Responsive Design**: Looks great on desktop, tablet, and mobile devices

- **Dark Mode**: Toggle between light and dark themes

- **Animations**: Smooth transitions and animations using Framer Motion and GSAP

- **Performance Optimizations**:
  - Lazy loading for images
  - Data caching
  - Efficient filtering and search

- **Accessibility Features**: Enhanced for better accessibility

## Project Structure

This project follows a standard React application structure with the following organization:

```
src/
├── assets/           # Static assets like images, fonts, and global styles
│   └── styles/       # Global CSS files
├── components/       # Reusable UI components
│   ├── common/       # Common components used across the application
│   ├── countries/    # Country-specific components
│   ├── layout/       # Layout components like Header, Footer, etc.
│   └── ui/           # Basic UI components like buttons, inputs, etc.
│       └── loading/  # Loading indicators and spinners
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components that represent routes
├── services/         # API service functions
└── utils/            # Utility functions and helpers
```

## Component Structure

- **Layout Components**: Components that define the structure of the application
  - Header: Main navigation with dark mode toggle

- **Page Components**: Components that represent different routes
  - Home: Displays the list of countries with search and filter options
  - CountryDetails: Displays detailed information about a specific country
  - About: Information about the application
  - Error: Displayed when a route is not found

- **Country Components**: Components related to country data
  - CountriesList: Displays a grid of country cards
  - CountryCard: Card component for displaying a country's basic information
  - CountryDetails: Detailed view of a country's information

- **UI Components**: Reusable UI elements
  - SearchBar: Component for searching countries
  - SelectMenu: Custom dropdown menu for filtering by region
  - Loading indicators: Visual feedback during data loading

## Custom Hooks

- **useFetch**: Custom hook for data fetching with caching and error handling

## Utilities

- **countryUtils**: Helper functions for formatting and manipulating country data

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Technologies Used

- **React**: UI library
- **React Router**: For routing
- **Framer Motion**: For animations
- **GSAP**: For advanced animations
- **Fuse.js**: For fuzzy search
- **CSS Variables**: For theming and dark mode

## API

This application uses the [REST Countries API](https://restcountries.com/) to fetch country data.

## Future Improvements

- Add more detailed country information
- Implement country comparison feature
- Add favorites/bookmarking functionality
- Enhance accessibility features
- Add more animations and transitions between routes
- Optimize image loading with more advanced techniques

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Features

- Browse countries
- Search for countries
- Filter countries by region
- View detailed information about each country
- Dark/Light theme toggle
