import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/home/Home';
import Products from './components/store/Products';
import Services from './components/store/Services';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';

import Unauthorized from './components/authentication/Unauthorized';
import { Role } from './react-app-env.d';
import Restricted from './components/authentication/Restricted';
import PersistLogin from './components/authentication/PersistAuth';
import AddProduct from './components/admin/products-panel/AddProduct';
import ProductsDashboard from './components/admin/products-panel/ProductsDashboard';
import MainDashboard from './components/admin/MainDashboard';


  
function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(//createRoutesFromElements = <Routes>
			<Route element={<PersistLogin />}>
				<Route path="/" element={<Layout />}>

					{/* public */}
					{/* <Route index element={<Index />}></Route> */}
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path="/unauthorized" element={<Unauthorized />} />

					{/* protected */}
					<Route element={<Restricted to={[Role.ADMIN]} />}>
						{/* dashboard here /> */}
					</Route>
					<Route path='/dashboard' element={<MainDashboard/>} >
						<Route path='products-dashboard'element={<ProductsDashboard/>}/>
						<Route path='add-product'element={<AddProduct/>}/>
					</Route>
					<Route path='/products' element={<Products />} />
					<Route path='/services' element={<Services />} />
				</Route>
			</Route>
		)//TODO: create protected routes
	);
	return <RouterProvider router={router} />;
}

export default App;
