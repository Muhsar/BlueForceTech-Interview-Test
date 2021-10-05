const API_URL = process.env.NODE_ENV==="production" ? "" : "http://localhost:8000/api"

export const LOGIN_URL = `${API_URL}/auth/`
export const GET_APPOINTMENTS = `${API_URL}/appointment/`
export const DELETE_APPOINTMENT =(id: string)=> `${API_URL}/appointment/${id}`
export const GET_APPOINTMENT =(id: string)=> `${API_URL}/appointment/${id}`
export const MAKE_APPOINTMENTS = `${API_URL}/appointment`