import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Products from './Products';

function App() {
  return (
   /* <Routes>
      <Route path="/" element={home}></Route>
    </Routes> */
    <div className="App">
        <Header/>   
        <Products/> 
    </div>
  );
}

export default App;
