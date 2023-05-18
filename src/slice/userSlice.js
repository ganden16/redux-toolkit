import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk('users/getUsers', async () => {
	const res = await axios.get('https://my-json-server.typicode.com/afifbasya/reactjs-redux/users')
	return res.data
})
export const getDetailUser = createAsyncThunk('users/getDetailUser', async (id) => {
	const res = await axios.get('https://my-json-server.typicode.com/afifbasya/reactjs-redux/users/' + id)
	return res.data
})
export const addUser = createAsyncThunk('users/addUser', async (data) => {
	const res = await axios.post('https://my-json-server.typicode.com/afifbasya/reactjs-redux/users', data)
	return res.data
})
export const updateUser = createAsyncThunk('users/updateUser', async (id, data) => {
	const res = await axios.put(`https://my-json-server.typicode.com/afifbasya/reactjs-redux/users/${id}`, data)
	return res.status
})
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
	const res = await axios.delete('https://my-json-server.typicode.com/afifbasya/reactjs-redux/users/' + id)
	return res.status
})

const userSlice = createSlice({
	name: 'users',
	initialState: {
		isLoading: false,
		errors: {},
		detailUser: {},
		users: [],
		response: {}
	},
	reducers: {
		setError: (state, action) => {
			state.errors = action.payload
		},
		filterUser: (state, action) => {
			state.users = state.users.filter(user => {
				if(user.nama.toLowerCase().includes(action.payload.toLowerCase()) || user.alamat.toLowerCase().includes(action.payload.toLowerCase())) return true
			})
		},
		getUsersOrderById: (state, action) => {
			if(action.payload == 'DESC') {
				state.users = state.users.sort((a, b) => b.id - a.id)
			}
			if(action.payload == 'ASC') {
				state.users = state.users.sort((a, b) => a.id - b.id)
			}
		},
		getUsersOrderByName: (state, action) => {
			if(action.payload == 'DESC') {
				state.users = state.users.sort((a, b) => {
					const namaA = a.nama.toUpperCase()
					const namaB = b.nama.toUpperCase()
					if(namaA < namaB) {
						return -1;
					}
					if(namaA > namaB) {
						return 1;
					}
				})
			}
			if(action.payload == 'ASC') {
				state.users = state.users.sort((a, b) => {
					const namaA = a.nama.toUpperCase()
					const namaB = b.nama.toUpperCase()
					if(namaA > namaB) {
						return -1;
					}
					if(namaA < namaB) {
						return 1;
					}
				})
			}
		},
		getUsersOrderByAlamat: (state, action) => {
			if(action.payload == 'DESC') {
				state.users = state.users.sort((a, b) => {
					const namaA = a.alamat.toUpperCase()
					const alamatB = b.alamat.toUpperCase()
					if(namaA < alamatB) {
						return -1;
					}
					if(namaA > alamatB) {
						return 1;
					}
				})
			}
			if(action.payload == 'ASC') {
				state.users = state.users.sort((a, b) => {
					const nameA = a.alamat.toUpperCase()
					const nameB = b.alamat.toUpperCase()
					if(nameA > nameB) {
						return -1;
					}
					if(nameA < nameB) {
						return 1;
					}
				})
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false
				state.errors.message = action.error.message
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false
				state.users = action.payload
			})
		builder
			.addCase(getDetailUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getDetailUser.rejected, (state, action) => {
				state.isLoading = false
				state.errors.message = action.error.message
			})
			.addCase(getDetailUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.detailUser = action.payload
			})
		builder
			.addCase(addUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addUser.rejected, (state, action) => {
				state.isLoading = false
				state.errors.message = action.error.message
			})
			.addCase(addUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.response = action.payload
			})
		builder
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false
				state.errors.message = action.error.message
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false
			})
		builder
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false
				state.errors.message = action.error.message
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.isLoading = false
			})
	}
})

export const {
	setError, filterUser, getUsersOrderById,
	getUsersOrderByName, getUsersOrderByAlamat
} = userSlice.actions
export default userSlice.reducer