function errorHandler (err) {
  this.$swal.close()
  if (err.response) {
    this.$swal.fire({
      type: 'error',
      title: 'Oops...',
      text: `${err.response.data.message}`
    })
    if (err.response.status === 401 || err.response.status === 403) {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  } else if (err.request) {
    this.$swal.fire({
      type: 'error',
      title: 'Oops...',
      text: `No response from server`
    })
  } else {
    console.log(err)
  }
}

export default errorHandler
