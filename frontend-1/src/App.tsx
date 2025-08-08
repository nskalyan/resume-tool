import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EvaluateResumePage from './pages/EvaluateResumePage';
import ResumeEditorPage from './pages/ResumeEditorPage';
import ExampleViewerPage from './pages/ExampleViewerPage';
import AboutPage from './pages/AboutPage';
import './styles/theme.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/evaluate" element={<EvaluateResumePage />} />
            <Route path="/editor" element={<ResumeEditorPage />} />
            <Route path="/examples" element={<ExampleViewerPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;