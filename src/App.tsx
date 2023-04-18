import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import Navbar from './components/Header/Navbar';
import NotFound from './screens/NotFound';
import Login from './screens/Login';
import Register from './screens/Register';
import NoteFormScreen from './screens/NoteFormScreen';
import ProtectedScreen from './HOCs/ProtectedScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedScreen>
                <HomePage />
              </ProtectedScreen>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/addnote"
            element={
              <ProtectedScreen>
                <NoteFormScreen />
              </ProtectedScreen>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedScreen>
                <NoteFormScreen />
              </ProtectedScreen>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
