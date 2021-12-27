import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Header from './components/Home/Header/Header';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/**
 * Cú pháp router v6 khác với v5
 * https://reactrouter.com/docs/en/v6/getting-started/overview#configuring-routes
 * -> chú ý syntax , đóng mở ngoặc
 *
 * https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type
 * https://reactrouter.com/docs/en/v6/upgrading/v5#advantages-of-route-element
 * Đoạn phía trên đề cập exact bị bỏ
 */
