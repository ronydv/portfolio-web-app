import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import Services from './components/catalog/Catalog';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';

import Unauthorized from './components/authentication/Unauthorized';
import { Role } from './react-app-env.d';
import Restricted from './components/authentication/Restricted';
import PersistLogin from './components/authentication/PersistAuth';
import AddProduct from './components/admin/products-management/AddProduct';
import ProductsDashboard from './components/admin/products-management/ProductsDashboard';
import MainDashboard from './components/admin/MainDashboard';
import ModifyProduct from './components/admin/products-management/ModifyProduct';
import ProductDetails from './components/catalog/ProductDetails';


  
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
						<Route path='modify-product/:id'element={<ModifyProduct/>}/>
					</Route>
					<Route path='/catalog' element={<Catalog />} />
					<Route path='/product-details/:id' element={<ProductDetails/>} />
				</Route>
			</Route>
		)//TODO: create protected routes
	);
	return <RouterProvider router={router} />;
}

export default App;
