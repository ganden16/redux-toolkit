import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {
	getUsers, deleteUser, filterUser,
	getUsersOrderById, getUsersOrderByName,
	getUsersOrderByAlamat
} from "../slice/userSlice"
import {useEffect, useState} from "react";
import swal from "sweetalert";

export default function Home() {
	const dispatch = useDispatch()
	const [search, setSearch] = useState('')
	const [status, setStatus] = useState('')
	const [orderById, setOrderById] = useState('ASC')
	const [orderByName, setOrderByName] = useState('ASC')
	const [orderByAlamat, setOrderByAlamat] = useState('ASC')
	const {users, isLoading} = useSelector((state) => state.users)

	const handleDeleteUser = (id) => {
		dispatch(deleteUser(id)).then(() => {
			setStatus('success')
			dispatch(getUsers())
		})
	}
	const handleSearchUsers = () => {
		dispatch(getUsers()).then(() => {
			dispatch(filterUser(search))
		})
	}
	useEffect(() => {
		status == 'success' && swal(
			"User Deleted!",
			"User berhasil dihapus",
			"success"
		).then(() => setStatus(''))
	}, [status])

	useEffect(() => {
		if(search) handleSearchUsers()
		if(!search) dispatch(getUsers())
	}, [search])

	useEffect(() => {
		if(orderById == 'DESC') dispatch(getUsersOrderById('DESC'))
		if(orderById == 'ASC') dispatch(getUsersOrderById('ASC'))
	}, [orderById])

	useEffect(() => {
		if(orderByName == 'DESC') dispatch(getUsersOrderByName('DESC'))
		if(orderByName == 'ASC') dispatch(getUsersOrderByName('ASC'))
	}, [orderByName])

	useEffect(() => {
		if(orderByAlamat == 'DESC') dispatch(getUsersOrderByAlamat('DESC'))
		if(orderByAlamat == 'ASC') dispatch(getUsersOrderByAlamat('ASC'))
	}, [orderByAlamat])

	return (
		<>
			<div className="row d-flex justify-content-between">
				<div className="col">
					<Link to={'/create'}><button className="btn btn-dark">Create User</button></Link>
				</div>
				<div className="col-3">
					<input value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" type="text" placeholder="Search..." />
				</div>
			</div>
			<h2 className="text-center mb-5">List Users</h2>
			<table className="table">
				<thead>
					<tr>
						<th className="text-center">
							ID {' '}
							<span onClick={() => setOrderById(state => state == 'ASC' ? 'DESC' : 'ASC')} style={{cursor: 'pointer'}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
								</svg>
							</span>
						</th>
						<th className="text-center">
							Nama {' '}
							<span onClick={() => setOrderByName(state => state == 'ASC' ? 'DESC' : 'ASC')} style={{cursor: 'pointer'}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
								</svg>
							</span>
						</th>
						<th className="text-center">
							Alamat {' '}
							<span onClick={() => setOrderByAlamat(state => state == 'ASC' ? 'DESC' : 'ASC')} style={{cursor: 'pointer'}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
								</svg>
							</span>
						</th>
						<th className="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{
						!isLoading && users.length > 0 &&
						users.map(user => (
							<tr key={user.id}>
								<td className="text-center">{user.id}</td>
								<td className="text-center">{user.nama}</td>
								<td className="text-center">{user.alamat}</td>
								<td className="text-center">
									<Link className="me-2" to={`/detail/${user.id}`}>Detail</Link>
									<Link className="me-2" to={`/edit/${user.id}`}>Edit</Link>
									<button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Hapus</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
			{
				isLoading && <h3 className="text-center">Loading...</h3>
			}
		</>
	)
}
