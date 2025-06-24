// utils/auth.js

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role') // ✅ clear role too
}
export const getUserRole = () => localStorage.getItem('role')