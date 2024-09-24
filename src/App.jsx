import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Smartphones from "./pages/Smartphones"; // Make sure to import missing pages
import Laptops from "./pages/Laptops";
import Headphones from "./pages/Headphones";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/smartphones" element={<Smartphones />} /> {/* Fixed to use element */}
            <Route path="/laptops" element={<Laptops />} /> {/* Fixed to use element */}
            <Route path="/headphones" element={<Headphones />} /> {/* Fixed to use element */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
