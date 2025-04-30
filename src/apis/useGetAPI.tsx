import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import axiosClient from '../libs/axiosClient';
import { useNotify } from '../hooks/useNotify';
import { alertError, alertSuccess } from '../utils/notify';

interface SuccessResult<T> {
    data: T;
    error: null;
};
interface BadResult {
    data: null;
    error: any;
};

interface OptionsType {
    url: string;
    params?: AxiosRequestConfig;
    signal?: AbortSignal;
};

export default function useGetAPI<T>(): (options: OptionsType) => Promise<SuccessResult<T> | BadResult> {
    const { notify } = useNotify();

    // API
    return async ({ url, params, signal }: OptionsType) => {
        try {
            const response: AxiosResponse = await axiosClient.get<T>(url, {
                params: params,
                signal: signal, // Pass the AbortSignal here
            });
            // notify(alertSuccess(response.data.msg));
            return { data: response.data, error: null };
        } catch (error: any) {
            if (axios.isCancel(error)) {
                console.log('Error', error.message);
                return { data: null, error: null }; // Return a null error for cancellation
            }
            notify(alertError('Get request error'));
            return { data: null, error: error as any };
        }
    };
}
