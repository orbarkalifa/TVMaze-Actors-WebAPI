# TVMaze Israeli Actors API & Client

This project is a full-stack application designed to fetch, display, and manage data about actors from the TVMaze API. It features a Node.js/Express backend that serves data to a React frontend, incorporating server-side caching, data validation, and the ability for users to add and delete comments for each actor.

---

## Tech Stack

**Backend:**
*   Node.js
*   Express
*   Axios (for external API communication)
*   `node-cache` (for in-memory caching)
*   `express-validator` (for request validation)
*   `lowdb` (for simple JSON file-based persistence)

**Frontend:**
*   React
*   Vite
*   Axios
*   `react-hot-toast` (for user notifications)
*   Bootstrap & `react-bootstrap`

---

## Features

*   **External API Integration:** Fetches cast data from the public TVMaze API.
*   **Configurable Caching:** Implements a 5-minute server-side cache to reduce redundant API calls and improve performance.
*   **Comment Functionality:** Users can add a comment to any actor, which is persisted on the server.
*   **Data Management:** Users can delete an actor's comment or clear the actor's data from the server cache directly from the UI.
*   **Robust Error Handling:** Centralized error handling on both the client and server ensures a smooth user experience.
*   **User-Friendly Notifications:** Provides clear, non-blocking toast notifications for all actions (loading, success, and error states).

---

## Setup & Run Instructions

To get the project running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/orbarkalifa/TVMaze-Actors-WebAPI.git
    cd TVMaze-Actors-WebAPI
    ```

2.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Run the Server:**
    (From the `server` directory)
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`.

5.  **Run the Client:**
    (From the `client` directory, in a new terminal)
    ```bash
    npm run dev
    ```
    The client will start on `http://localhost:5173` and will be ready to use.

---

## Design Decisions

*   **Why `express-validator`?**
    *   To implement robust, declarative, and maintainable validation for incoming API requests. This follows industry best practices by separating validation logic from controller logic, keeping the codebase clean and secure.

*   **Why `node-cache`?**
    *   For a lightweight, high-performance, in-memory caching solution that is perfectly suited for the scope of this project. It avoids the setup and overhead of a more complex external caching service like Redis while still providing significant performance benefits.

*   **Why `lowdb`?**
    *   To provide a simple, lightweight, and file-based persistence layer without requiring a full database setup. For the scope of this project, `lowdb` offers a robust API for JSON file manipulation, making it a more structured and reliable choice than direct `fs` (File System) reads and writes, while still being easy to manage and deploy.