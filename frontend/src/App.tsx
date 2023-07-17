import {Routes,Route,BrowserRouter,useLocation} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Categories from './pages/Categories';
import SingleCategory from './pages/SingleCategory';
import ProductForm from './pages/AddForm';
import SingleProduct from './pages/SingleProduct';
import UpdateProductForm from './pages/UpdateProductForm';
import Cart from './components/Cart';
import Home from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import HelpPage from './pages/Help';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Faq from './pages/Faq';


function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/'
            element={
              <Home/>
            }
          />
          <Route path='/products'
            element={ 
              <Products/>
            }
          />
          <Route path='/categories'
            element={
              <Categories/>
            }
          />
          <Route path='/categories/:category'
              element={
                <SingleCategory/>
              }
          />
          <Route path='/addproduct'
              element={
                <ProductForm/>
              }
          />
          <Route path='/product/:id'
              element={
                <SingleProduct/>
              }
          />
          <Route path='/updateproduct/:id'
              element={
                <UpdateProductForm/>
              }
          />
          <Route path='/cart'
              element={
                <Cart/>
              }
          />
          <Route path='/about'
              element={
                <AboutPage/>
              }
          />
          <Route path='/contact'
              element={
                <ContactPage/>
              }
          />
          <Route path='/help'
              element={
                <HelpPage/>
              }
          />
          <Route path='/signup'
              element={
                <Signup/>
              }
          />
          <Route path='/login'
              element={
                <Login/>
              }
          />
          <Route path='faq' 
              element={
                <Faq/>
              }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
