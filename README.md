# Pokedex Web Application

A simple and interactive web-based Pokedex built with HTML, CSS, and vanilla JavaScript. It uses the [PokeAPI](https://pokeapi.co/) to fetch and display data for over 1,000 Pokémon.

## Features

- **Browse Pokémon:** View a grid of Pokémon, 20 per page.
- **Smart Pagination:** Easily navigate through the entire list of Pokémon using a clean pagination system that shows a limited window of pages (e.g., `1 ... 9, 10, 11 ... 66`).
- **Search Functionality:** Instantly find any Pokémon by typing its name or ID in the search bar and hitting "Enter" or clicking the search button.
- **Detailed View:** Click on any Pokémon card to open a modal with detailed information, including:
    - ID number
    - Image
    - Height and Weight
    - Abilities
    - Types
- **Responsive Design:** The layout adapts to different screen sizes, providing a seamless experience on both desktop and mobile devices.

## Technologies Used

- **HTML5:** For the structure and content of the application.
- **CSS3:** For all styling, including a responsive grid layout and modal design.
- **Vanilla JavaScript (ES6+):** For all application logic, including:
    - Asynchronous API calls using `async/await` to fetch data.
    - Dynamic DOM manipulation to display Pokémon and pagination.
    - Event handling for search, clicks, and modal interactions.
- **PokeAPI:** The free and open RESTful API used to source all Pokémon data.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You only need a modern web browser that supports JavaScript. No other dependencies required.

### Installation

1.  Clone the repository or download the files to your local machine.
2.  Navigate to the project directory.
3.  Open the `pokedex.html` file in your web browser.


## File Structure

```
pokedex/
├── pokedex.html      # The main HTML file for the application structure.
├── styles.css        # All CSS styles for layout, presentation, and responsiveness.
└── script.js         # All JavaScript for fetching data and handling user interactions.
```
