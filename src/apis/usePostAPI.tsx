import { useNotify } from '../hooks/useNotify';
import axiosClient from '../libs/axiosClient';
import { FieldValues } from 'react-hook-form';
import { alertError, alertSuccess } from '../utils/notify';

interface SuccessResult<T> {
  result: true;
  error: null;
  hasResponse: T;
};
interface BadResult {
  result: false;
  error: any | null;
  hasResponse: null;
};

interface OptionsType {
  url: string;
  params?: FieldValues | FormData;
  payloads?: FieldValues | FormData;
  successMessage?: string;
  hasFileData?: boolean;
  sendRequest?: boolean;
};

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

export default function usePostAPI<T = undefined>(): (options: OptionsType) => Promise<SuccessResult<T> | BadResult> {
  const { notify } = useNotify();

  // API
  return async ({ url, params, successMessage, payloads, hasFileData = false, sendRequest = false }: OptionsType) => {
    try {
      const res = await axiosClient({
        url,
        method: 'POST',
        params,
        data: payloads,
        ...(hasFileData ? config : undefined)
      });
      if (successMessage) { 
        notify(alertSuccess(successMessage)); 
      } else {
        notify(alertSuccess("Successfully done!")); 
      }

      return { result: true, error: null, hasResponse: res?.data as T };
    } catch (error: any) {
      console.error(error);
      // 
      notify(alertError(sendRequest ? '1' : '2'));
      return { result: false, error: error ,hasResponse: null};
    }
  };
}
