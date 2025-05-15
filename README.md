# GameLibrary

GameLibrary is a modern game library app where you can browse and search for games with a 
stylish user interface. The frontend is built with Vue 3, TypeScript, and Tailwind CSS. 
The backend uses Node.js and a MongoDB database.

## Features

- Games are displayed as cards with hover effects and animations
- Game details open in a modal (popup)
- Animated search bar and highlighted search results
- Responsive and modern design
- Image placeholders and error handling
- Release date shown on cards and in the modal
- Backend stores games in a MongoDB database

## Getting Started

1. **Clone the repository:**

   ```powershell
   git clone https://github.com/Kuismamj/gamelibrary.git
   cd gamelibrary/frontend
   ```

2. **Install dependencies:**

   ```powershell
   npm install
   ```

3. **Start the development server:**
   ```powershell
   npm run dev
   ```
   The app will open in your browser at [http://localhost:5173](http://localhost:5173) 
(or the port Vite reports).

## Notes

- This repository contains only the frontend. If you need the backend, deploy it 
separately (e.g. Render, Railway, etc.).
- The backend uses MongoDB to store game data.
- All game images are located in `public/images/`.
