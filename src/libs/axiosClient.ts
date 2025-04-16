// src/lib/axiosClient.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getSession } from './cookie';

// TypeScript interface for your token storage or other purposes
interface TokenResponse {
    access_token: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

// Create an Axios instance
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || '',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getSession()}`,
    },
    withCredentials: true
})

let access_token = 'initial_bad_token'
let refreshing_token: Promise<AxiosResponse<TokenResponse>> | null = null

// Request interceptor to add the authentication token
axiosClient.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    config.headers!['Authorization'] = `Bearer ${getSession()}`
    return config
})

// Response interceptor to handle token refresh
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        // Provide a fallback config if error.config is undefined
        const config = error.config as CustomAxiosRequestConfig

        if (error.response?.status === 401 && !config._retry) {
            config._retry = true

            if (!refreshing_token) {
                refreshing_token = refresh_token()
            }

            try {
                const res = await refreshing_token
                refreshing_token = null
                access_token = res.data.access_token
                return axiosClient(config)
            } catch (err) {
                refreshing_token = null
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)


async function refresh_token(): Promise<AxiosResponse<TokenResponse>> {
    return axios.get<TokenResponse>(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/refresh`)
}

export default axiosClient
