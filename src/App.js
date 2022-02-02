import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Header from './components/Home/Header/Header';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoList from './pages/ToDoList/ToDoList';
import ToDoListRFC from './pages/ToDoList/ToDoListRFC';
import ToDoListRedux from './pages/ToDoList/ToDoListRedux';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Modal from './HOC/Modal/Modal';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Modal />
      <LoadingComponent />
      <Routes>
        {/* Router v5 Router render props default */}
        {/* <Route
          exact
          path="/home"
          render={(propsRoute) => {
            return (
              <div>
                <Header />
                <Home {...propsRoute} />
              </div>
            );
          }}
        /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/home" element={<HomeTemplate ele={Home} />} />

        <Route path="/contact" element={<HomeTemplate ele={Contact} />} />
        <Route path="/about" element={<HomeTemplate ele={About} />} />

        <Route path="/oldlogin" element={<HomeTemplate ele={Login} />} />
        <Route
          path="/login"
          element={<UserLoginTemplate Component={LoginCyberBugs} />}
        />
        <Route
          path="/oldlogin"
          element={<UserLoginTemplate Component={Login} />}
        />
        <Route path="/detail/:id" element={<HomeTemplate ele={Detail} />} />
        <Route path="/profile" element={<HomeTemplate ele={Profile} />} />

        <Route path="/todolistrcc" element={<HomeTemplate ele={ToDoList} />} />
        <Route
          path="/todolistrfc"
          element={<HomeTemplate ele={ToDoListRFC} />}
        />
        <Route
          path="/todolistredux"
          element={<HomeTemplate ele={ToDoListRedux} />}
        />
        <Route
          path="/todolistsaga"
          element={<HomeTemplate ele={BaiTapToDoListSaga} />}
        />
        <Route
          path="/demohocmodal"
          element={<HomeTemplate ele={DemoHOCModal} />}
        />

        <Route path="/" element={<HomeTemplate ele={Home} />} />
        <Route path="*" element={<HomeTemplate ele={PageNotFound} />} />
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
