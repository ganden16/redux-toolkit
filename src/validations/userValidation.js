const userValidation = (values) => {
	let errors = '';

	if(!values.nohp || !values.nama || !values.alamat || !values.umur) {
		errors = "Input tidak boleh kosong";
	}

	return errors
}
export default userValidation