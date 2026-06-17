import axios from 'axios';

// Base URL backend — gunakan IP lokal komputer saat dev dengan device fisik/Expo Go
// Emulator Android: http://10.0.2.2:3000
// iOS Simulator: http://localhost:3000
// Device fisik / Expo Go: gunakan IP lokal komputer
const BASE_URL = 'http://192.168.100.222:3000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambahkan token ke setiap request yang butuh auth
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// ─── Auth API ─────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', payload);
  return response.data;
};

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const registerApi = async (payload: RegisterPayload) => {
  const response = await apiClient.post('/api/auth/register', payload);
  return response.data;
};
