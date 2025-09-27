import './App.css';
import Home from "./pages/Home.jsx"
import { Route, Routes } from "react-router-dom";
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
import CustomerRoutes from './components/CustomerRoutes.js';
import StaffRoutes from './components/StaffRoutes.js';

function App() {
  const isCustomer = useSelector((state) => state.role.isCustomer);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* content area grows and pushes footer down */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          {/* <Route path="/vieworders" element={<ViewOrders />}></Route> */}

          <Route path="/contactus" element={<ContactForm />}></Route>

          {/* Protected Customer Route */}
          <Route
            path="/myorders"
            element={
              <CustomerRoutes>
                <MyOrders />
              </CustomerRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <CustomerRoutes>
                <Cart />
              </CustomerRoutes>
            }
          />
          <Route
            path="/vieworders"
            element={
              <StaffRoutes>
                <ViewOrders />
              </StaffRoutes>
            }
          />
          <Route
          path="/additem"
          element={
            <StaffRoutes>
              <AddItem />
            </StaffRoutes>
          }
          />
         
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
