
import UsePostAPI from "../../../apis/usePostAPI";
import { FieldValues } from "react-hook-form";
import { WalletAddressUrl } from "../consts";

export default function postWalletAddress(): (v: FieldValues) => Promise<any> {
    // const setLoader = useSetLoader()
    const fetchPostAPI = UsePostAPI();
    // const dispatch = useAppDispatch()

    return async (v: FieldValues) => {
        try {
            // setLoader(true)

            const res = await fetchPostAPI({
                url: WalletAddressUrl,
                params: {},
                payloads: v,
            });
            // dispatch(setReload('exchangeData'))
            return {
                result: res.result,
                data: res?.hasResponse
            };
        } catch (e) {
            console.error(e);
            return false;
        } finally {
            // setLoader(false)
        }
    };
}
