
import  React from "react";
import "./App.css";
import { Routes, Route, Link,Navigate,useNavigate} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/login/Login";
import SignUp from "./components/users/SignUp";
import Home from "./components/Home";
import UserProfile from "./components/users/UserProfile";
import setAuthToken from './components/setAuthToken';
function App() {
  const navigate = useNavigate();
  // const [token, setToken] = useState(localStorage.getItem('token'))
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  
  function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("token") ? flag=true : flag=false
   
    return flag
  }
  return (
    <div className="App">
        {/* { !token && (<Navigate to="/" replace={true}/>)}
        {!token && (<Navigate to="/login" replace={true}/>)} */}
        <Routes>
        <Route
           exact path="/user-profile"
           element={
               hasJWT() ?
                   <UserProfile navigate= {navigate} NavLink = {Link}/>
                   :
                   <Navigate to={{ pathname: '/login' }} />
           }
          />
          <Route 
           exact path="/dashboard"
           element={
               hasJWT() ?
                   <Dashboard navigate= {navigate} NavLink = {Link} />
                   :
                   <Navigate to={{ pathname: '/login' }} />
           }
          />
          <Route exact path="/" element={<Home Link={Link} />}></Route>
          <Route exact path="/login" element={<Login navigate= {navigate} NavLink = {Link}/>}></Route>
          <Route exact path="/sign-up" element={<SignUp navigate= {navigate} NavLink = {Link}/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
