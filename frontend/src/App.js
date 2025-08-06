import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ActasDashboard from './pages/ActasDashboard';
import ActaDetailPage from './pages/ActaDetailPage';
import ActaCreatePage from './pages/ActaCreatePage';
import ProtectedLayout from './components/ProtectedLayout';
import './App.css'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <h1>Gestión de Actas y Compromisos</h1>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />

            {/* Se cambia el ProtectedRoute por el nuevo Layout que contiene el Header para el cierre de sesión */}
            <Route element={<ProtectedLayout />}>
              <Route path="/actas" element={<ActasDashboard />} />
              <Route path="/actas/nueva" element={<ActaCreatePage />} />
              <Route path="/actas/:id" element={<ActaDetailPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;