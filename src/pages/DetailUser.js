import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getDetailUser} from "../slice/userSlice"
import {Link, useParams} from "react-router-dom"

export default function DetailUser() {
	const {detailUser, isLoading} = useSelector((state) => state.users)
	const [isFetch, setIsFetch] = useState(false)
	const dispatch = useDispatch()
	const {id} = useParams()

	useEffect(() => {
		dispatch(getDetailUser(id)).then(() => setIsFetch(true))
	}, [])
	return (
		<>
			<Link to={'/'} className="btn btn-dark ms-5">Back</Link>
			<h2 className="text-center mb-5">Detail User</h2>
			{
				isLoading && <h3 className="text-center">Loading...</h3>
			}
			{
				isFetch &&
				<>
					<div className="w-75 mx-auto">
						<div className="bg-secondary bg-opacity-25 p-2 rounded-2">
							<span className="me-5">Nama</span>
							<span className="ms-5">:</span>
							<span className="ms-3">{detailUser.nama}</span>
						</div>
						<div className="p-2">
							<span className="me-5">Alamat</span>
							<span className="ms-5">:</span>
							<span className="ms-3">{detailUser.alamat}</span>
						</div>
						<div className="bg-secondary bg-opacity-25 p-2 rounded-2">
							<span className="me-5">Umur</span>
							<span className="ms-5">:</span>
							<span className="ms-3">{detailUser.umur}</span>
						</div>
						<div className="p-2">
							<span className="me-5">no HP</span>
							<span className="ms-5">:</span>
							<span className="ms-3">{detailUser.nohp}</span>
						</div>
					</div>
				</>
			}
		</>
	)
}
