import './App.css';
import Home from "./pages/Home.jsx"
import {Route , Routes} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Menu from './components/Menu.jsx';
import AddItem from './components/AddItem.jsx';
import ViewOrders from './components/ViewOrders.jsx';
import Cart from './components/Cart.jsx';
import ContactForm from './components/Contactus.jsx';
import MyOrders from './components/MyOrders.jsx';
import Hero from './components/HeroSection.jsx';
import History from './components/History.jsx';
function App() {
  return (
    <div>
      <Navbar/>
      {/* <Hero/> */}
      {/* <History/> */}
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/menu' element={<Menu/>}></Route>
      <Route path='/additem' element={<AddItem/>}></Route>
      <Route path='/vieworders' element={<ViewOrders/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/contactus' element={<ContactForm/>}></Route>
      <Route path='/myorders' element={<MyOrders/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
