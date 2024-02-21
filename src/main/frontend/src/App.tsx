import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/home/Home';
import Products from './components/products/Products';
import Services from './components/products/Services';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(//createRoutesFromElements = <Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route index element={<Index />}></Route> */}
					<Route path='/' element={<Home />}/>
					<Route path='/login' element={<Login/>}/>
					<Route path='/signup' element={<Signup/>}/>
					<Route path='/products' element={<Products/>}/>
					<Route path='/services'element={<Services/>}/>
				</Route>
		)
	  );
	  return <RouterProvider router={router} />;
}

export default App;
