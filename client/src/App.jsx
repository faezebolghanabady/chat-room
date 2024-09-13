import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/dahboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;