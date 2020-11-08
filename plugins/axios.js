export default function ({ $axios, redirect, app }) {
  $axios.onRequest((config) => {
  })
  $axios.onError((error) => {
    return Promise.resolve(error.response)
  })
}
