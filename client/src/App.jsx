
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Chat from './componnents/Chat';




function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
         <Route path="/" element={<Registration />} />
         <Route path="/chat" element={<Chat/>} />
        <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;