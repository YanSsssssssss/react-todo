import './App.css';
import TodoList from './todoList';
import Login from './login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // return <Suspense fallback={'Loading...'}>{element}</Suspense>;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/todos"
          element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
