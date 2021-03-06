import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Modal from './HOC/Modal/Modal';
// import Header from './components/Home/Header/Header';
import About from './pages/About/About';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import Contact from './pages/Contact/Contact';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import IndexCyberBugs from './pages/CyberBugs/indexCyberBugs';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoList from './pages/ToDoList/ToDoList';
import ToDoListRedux from './pages/ToDoList/ToDoListRedux';
import ToDoListRFC from './pages/ToDoList/ToDoListRFC';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import DragAndDropDnD from './pages/DragAndDropDnD/DragAndDropDnD';

function App() {
  const history = useNavigate();
  const dispatch = useDispatch();

  // https://stackoverflow.com/questions/70881320/redirect-to-route-from-saga-using-react-router-v6
  // có 3 cách tuy nhiên dùng thư viện sẽ có khả năng ko tương thích
  //
  // https://github.com/remix-run/react-router/issues/7634
  // dispatch được đảm bảo ko thay đổi nhưng useNavigate lại bị -> rerender
  // nếu đưa vào trong arr dependency của useEffect sẽ ko được
  // Có pp walk-around tạo 1 RouterUtils dom ảo bọc chức năng lại
  // Hoặc tạo 1 Dom App-main , để fix ES-Lint, hoặc chấp nhận warning

  useEffect(() => {
    dispatch({ type: 'ADD_HISTORY', history: history });
  }, [dispatch]);

  return (
    <>
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
        <Route
          path="/demodragdropdnd"
          element={<HomeTemplate ele={DragAndDropDnD} />}
        />

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

        <Route
          path="/cyberbugs"
          element={<CyberbugsTemplate ele={IndexCyberBugs} />}
        />
        <Route
          path="/createproject"
          element={<CyberbugsTemplate ele={CreateProject} />}
        />
        <Route
          path="/projectmanagement"
          element={<CyberbugsTemplate ele={ProjectManagement} />}
        />
        <Route
          path="/projectdetail/:projectId"
          element={<CyberbugsTemplate ele={IndexCyberBugs} />}
        />

        <Route path="/" element={<HomeTemplate ele={Home} />} />
        <Route path="*" element={<HomeTemplate ele={PageNotFound} />} />
      </Routes>
    </>
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
