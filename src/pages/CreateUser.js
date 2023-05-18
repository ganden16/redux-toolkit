import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {addUser} from '../slice/userSlice'
import swal from "sweetalert";
import userValidation from "../validations/userValidation";
import {setError} from "../slice/userSlice";

export default function CreateUser() {
	const dispatch = useDispatch()
	const [status, setStatus] = useState('')
	const {response, isLoading, errors} = useSelector((state) => state.users)
	const initialForm = {
		nama: '',
		alamat: '',
		umur: '',
		nohp: ''
	}
	const [formData, setFormData] = useState(initialForm)
	const handleChange = (e) => {
		setFormData((state) => ({
			...state,
			[e.target.name]: e.target.value
		}))
	}
	const handleSubmitAddUser = (e) => {
		e.preventDefault()
		const validation = userValidation(formData)
		const isValid = Object.values(validation).every(value => value == '');
		if(isValid) {
			dispatch(addUser(formData)).then((res) => {
				if(!res.error) {
					setStatus('success')
					setFormData(initialForm)
				}
			})
		} else {
			dispatch(addUser(formData)).then(() => {
				setStatus('error')
				dispatch(setError(validation))
				setFormData(initialForm)
			})
		}
	}
	useEffect(() => {
		status == 'success' && swal(
			"User Created!",
			"Nama : " +
			response.nama +
			" , Alamat : " +
			response.alamat +
			" , Umur : " +
			response.umur +
			" , NoHp : " +
			response.nohp,
			"success"
		).then(() => setStatus(''))
		status == 'error' && swal(
			"Failed!",
			errors,
			"error"
		).then(() => setStatus(''))
	}, [status])

	return (
		<>
			<Link to={'/'} className="btn btn-dark mb-5 mt-3">Back</Link>
			<h2 className="mb-4">Create New User</h2>
			{
				errors && <h2>{errors.message}</h2>
			}
			{
				isLoading ? <h2>Loading...</h2> :
					<form onSubmit={handleSubmitAddUser}>
						<div className="row mb-3">
							<div className="col-5">
								<label className="form-label">Nama :</label>
								<input value={formData.nama} onChange={handleChange} name="nama" className="form-control bg-secondary bg-opacity-25" />
							</div>
							<div className="col-5">
								<label className="form-label">Alamat :</label>
								<input value={formData.alamat} onChange={handleChange} name="alamat" className="form-control bg-secondary bg-opacity-25" />
							</div>
						</div>
						<div className="row">
							<div className="col-5">
								<label className="form-label">Nohp :</label>
								<input value={formData.nohp} onChange={handleChange} name="nohp" className="form-control bg-secondary bg-opacity-25" />
							</div>
							<div className="col-5">
								<label className="form-label">Umur :</label>
								<input value={formData.umur} onChange={handleChange} name="umur" className="form-control bg-secondary bg-opacity-25" />
							</div>
						</div>
						<button type="submit" className="btn btn-dark mt-4">Submit</button>
					</form>
			}
		</>
	)
}
