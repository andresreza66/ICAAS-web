/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar id="nav-main" />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home id="page-home" />} />
            <Route path="*" element={<Home id="page-home" />} />
          </Routes>
        </main>
        <Footer id="footer-main" />
      </div>
    </Router>
  );
}
