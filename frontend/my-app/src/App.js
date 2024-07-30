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
import { useSelector } from 'react-redux';
import Footer from './components/common/Footer.jsx';
function App() {
  const isCustomer = useSelector((state) => state.role.isCustomer);
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/menu' element={<Menu/>}></Route>
      
      <Route path='/vieworders' element={<ViewOrders/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/contactus' element={<ContactForm/>}></Route>
      <Route path='/myorders' element={<MyOrders/>}></Route>

      {!isCustomer && (
          <Route path='/additem' element={<AddItem />} />
        )}

      </Routes>
    </div>
  )
}

export default App;
