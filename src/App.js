import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import CreateUser from './pages/CreateUser'
import DetailUser from './pages/DetailUser'
import EditUser from './pages/EditUser'

function App() {
	return (
		<>
			<div className='container pt-4'>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/create' element={<CreateUser />} />
						<Route path='/detail/:id' element={<DetailUser />} />
						<Route path='/edit/:id' element={<EditUser />} />
					</Routes>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
