import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Mission from './pages/Mission';
import Products from './pages/Products';
import Tools from './pages/Tools';
import Team from './pages/Team';
import Contact from './pages/Contact';

const App: React.FC = () => {
    return (
        <Router>
            <LanguageProvider>
                <ThemeProvider>
                    <Main />
                </ThemeProvider>
            </LanguageProvider>
        </Router>
    );
};

// Separate component to use hooks
const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mission" element={<Mission />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
