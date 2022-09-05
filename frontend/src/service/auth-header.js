export default function authHeader() {
  //const user = JSON.parse(localStorage.getItem('user'))
const user = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3QgbGFzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1MjY4Nzk1MH0.FKsgtAw1W-tT6aKxCHV5Ubj8VzkzP5vuzH8ANyy_-pc";
  if (user) {
    return { Authorization: 'Bearer ' + user }
    // return { "x-auth-token": user.accessToken };
  } else {
    return {}
  }
}
