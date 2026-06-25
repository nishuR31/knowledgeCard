import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import NotFound from './pages/notFound';
import Settings from './pages/settings';
import Layout from './pages/layout';
import Author from './pages/author';

function App() {
  useEffect(() => {
    // Ensure dark theme and glass base globally
    document.body.classList.add('dark', "glass", "bg-theme");
    // Clean up any other theme/base classes
    document.body.classList.remove('light', 'mini', 'clay');
  }, []);



  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/author" element={<Author />} />

          {/* <Route path="/knowledge" element={<Knowledge />} /> */}
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
