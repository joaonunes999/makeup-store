import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from './components/Header';
import Products from './Products';
import ProductDetails from './ProductDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
