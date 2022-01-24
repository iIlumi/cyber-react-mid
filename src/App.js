import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Header from './components/Home/Header/Header';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoList from './pages/ToDoList/ToDoList';
import ToDoListRFC from './pages/ToDoList/ToDoListRFC';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todolistrcc" element={<ToDoList />} />
        <Route path="/todolistrfc" element={<ToDoListRFC />} />

        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
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
