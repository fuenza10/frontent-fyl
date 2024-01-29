export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authUser") as string)

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken }
  } else {
    return {}
  }
}
