import axios from 'axios';

// Base URL backend — gunakan IP lokal komputer saat dev dengan device fisik/Expo Go
// Emulator Android: http://10.0.2.2:3000
// iOS Simulator: http://localhost:3000
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.100.131:3000';

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
  nip: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
  } | null;
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', payload);
  return response.data;
};

export interface RegisterPayload {
  name: string;
  nip: string;
  password: string;
  role: 'admin' | 'petugas';
}

export const registerApi = async (payload: RegisterPayload) => {
  const response = await apiClient.post('/api/auth/register', payload);
  return response.data;
};

export const checkUserRole = async (token: string): Promise<'admin' | 'petugas'> => {
  try {
    await apiClient.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'admin';
  } catch (error: any) {
    if (error?.response?.status === 403) {
      return 'petugas';
    }
    throw error;
  }
};

export interface ParkingAreaBackend {
  id_area: number;
  name_area: string;
  location: string;
  kapasitas_total: number;
  photo: string;
  kendaraan_masuk: number;
  slot_tersedia: number;
  created_at: string;
  updated_at: string;
}

export interface GetParkingAreasResponse {
  status: boolean;
  message: string;
  data: ParkingAreaBackend[];
}

export const getParkingAreasApi = async (): Promise<GetParkingAreasResponse> => {
  const response = await apiClient.get<GetParkingAreasResponse>('/api/public/parking-area');
  return response.data;
};

export const getPhotoUrl = (photo: string) => {
  if (!photo) return 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400';
  if (photo.startsWith('http')) return photo;
  const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://10.20.90.89:3000';
  return `${baseUrl}/uploads/parking-area/${photo}`;
};
