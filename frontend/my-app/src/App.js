import './App.css';
import Home from "./pages/Home.jsx"
import {Route , Routes} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      
      </Routes>
    </div>
  )
}

export default App;
