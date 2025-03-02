# Grammar Checker Application


This is a full-stack web application built with *React* for the frontend, *Node.js* and *Express* for the backend, and *PostgreSQL* for the database. The application provides a user-friendly interface for *real-time* checking grammar and spelling mistakes in text using *OpenAI's GPT-3.5-turbo* model. It also includes a login system with protected routes. The entire application, including the frontend, backend, and database, is deployed on *Railway*.

---

## Features

1. **User Authentication**:
   - Users can log in with a username and password.
   - Protected routes ensure only authenticated users can access the dashboard.

2. **Grammar and Spelling Check**:
   - Users can input text, and the application will highlight incorrect words.
   - The backend uses OpenAI's GPT-3.5-turbo model to identify grammar and spelling mistakes.

3. **Responsive Design**:
   - The application is designed to be responsive and works well on different screen sizes.

4. **Logout Functionality**:
   - Users can log out, which clears their authentication token and redirects them to the login page.

---

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing and navigation.
- **Axios**: For making HTTP requests to the backend.
- **CSS**: For styling the components.

### Backend:
- **Node.js**: A JavaScript runtime for building the server.
- **Express**: A web framework for Node.js.
- **PostgreSQL**: A relational database for storing user credentials.
- **OpenAI API**: For grammar and spelling checking.

### Tools:
- **dotenv**: For managing environment variables.
- **CORS**: For enabling cross-origin resource sharing.
- **body-parser**: For parsing incoming request bodies.

### Deployment:
- **Railway**: The frontend, backend, and database are deployed on Railway for seamless hosting and scalability.
---

## Installation and Setup

### Prerequisites:
- Node.js and npm installed on your machine.
- PostgreSQL database set up.
- OpenAI API key.

### Steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/grammar-checker-app.git
   cd grammar-checker-app
   ```

2. **Set Up the Backend**:
   - Navigate to the `Backend` directory:
     ```bash
     cd Backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `Backend` directory and add the following environment variables:
     ```env
     DATABASE_URL=your_postgresql_connection_string
     OPENAI_KEY=your_openai_api_key
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Set Up the Frontend**:
   - Navigate to the `Frontend` directory:
     ```bash
     cd ../Frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `Frontend` directory and add the following environment variable:
     ```env
     REACT_APP_BACKEND_URL=http://localhost:5000
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

4. **Set Up the Database**:
   - Ensure your PostgreSQL database is running.
   - Create a table named `users` with the following schema:
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(50) NOT NULL
     );
     ```
   - Insert some sample data:
     ```sql
     INSERT INTO users (username, password) VALUES ('admin', 'admin');
     ```

---

## Deployment

The application, including the frontend, backend, and database, is deployed on **Railway**. You can access the live application here:  
👉 [**Grammar Correction App**](https://grammer-correction-production-b7e0.up.railway.app/)

### Login Credentials:
- **Username**: `admin`
- **Password**: `admin`

---

## Project Structure

### Backend:
- `index.js`: The main server file that handles routing, database connections, and OpenAI API integration.

### Frontend:
- `src/App.js`: The main React component that sets up routing.
- `src/components/ProtectedRoute.js`: A component to protect routes from unauthorized access.
- `src/pages/Login.js`: The login page component.
- `src/pages/Dashboard.js`: The dashboard component where users can check grammar.
- `src/pages/login.css`: CSS for the login page.
- `src/pages/dashboard.css`: CSS for the dashboard page.

---

## Usage

1. **Login**:
   - Open the application in your browser (live link: [https://grammer-correction-production-b7e0.up.railway.app/](https://grammer-correction-production-b7e0.up.railway.app/)).
   - Use the credentials:
     - **Username**: `admin`
     - **Password**: `admin`

2. **Check Grammar**:
   - After logging in, you will be redirected to the dashboard.
   - Enter text in the input box, and the application will highlight any incorrect words.

3. **Logout**:
   - Click the "Logout" button to log out and return to the login page.

---

## Acknowledgments

- OpenAI for providing the GPT-3.5-turbo model.
- The React and Node.js communities for their extensive documentation and support.
- Railway for providing an easy-to-use deployment platform.

