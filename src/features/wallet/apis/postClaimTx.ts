
import UsePostAPI from "../../../apis/usePostAPI";
import { FieldValues } from "react-hook-form";
import { ClaimTxUrl } from "../consts";

export default function postClaimTx(): () => Promise<any> {
    // const setLoader = useSetLoader()
    const fetchPostAPI = UsePostAPI();
    // const dispatch = useAppDispatch()

    return async () => {
        try {
            // setLoader(true)

            const res = await fetchPostAPI({
                url: ClaimTxUrl,
                params: {},
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
