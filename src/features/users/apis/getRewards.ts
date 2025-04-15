import UseGetAPI from '../../../apis/useGetAPI';
import { RewardsAPIUrl } from '../consts/index';

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

export default function getRewards(): (params: any) => Promise<SuccessResult | BadResult> {
    const fetchGetAPI = UseGetAPI<any | null>();

    // 
    return async (params: any) => {
        try {
            // setLoader(true, "Fetching data...")
            const res = await fetchGetAPI({
                url: RewardsAPIUrl,
                params: params
            });
            // 
            if (res.error) {
                return {
                    result: false,
                    data: null
                };
            }
            // 
            // dispatch(setExchangeData(res.data))
            return {
                result: true,
                data: res.data
            }
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
