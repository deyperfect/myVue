import api from './axios'

// All auth-related API calls are isolated here — no business logic, just HTTP
export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
}
