import UseGetAPI from '../../../apis/useGetAPI';
import { SessionAPIUrl } from '../consts/index';

// API
interface SuccessResult {
    result: true;
    data: any;
};
// API
interface BadResult {
    result: false;
    data: null;
};

export default function getSession(): () => Promise<SuccessResult | BadResult> {
    const fetchGetAPI = UseGetAPI<any | null>();

    // 
    return async () => {
        try {
            // setLoader(true, "Fetching data...")
            const res = await fetchGetAPI({
                url: SessionAPIUrl
            });
            // 
            if (res.error) {
                return {
                    result: false,
                    data: null
                };
            }
            return {
                result: true,
                data: res.data
            };
        } catch (e) {
            console.error(e);
            return {
                result: false,
                data: null
            };
        } finally {
            // setLoader(false);
        }
    };
}
