export default function ({ $axios, redirect }) {
  $axios.setHeader('X-Api-Key', process.env.API_KEY)
  $axios.onError(error => {
    if (error.response.status === 500) {
      alert(error.response.data.error)
    }
  })
}
