
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import getRewardsCheck from '../features/wallet/apis/getRewardsCheck';
import Loading from '../components/loading';

function ClaimPage() {
    const { value } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);

    const getRewardsCheckAPI = getRewardsCheck();

    useEffect(() => {
        if(value) {
            getRewardsCheckAPI({
                "reward_id": value
            }).then(data => {
                setLoading(false);
                if(data.result){
                    if(data.data)
                        navigate(`/homee/claim`, { state: { rewardId: value }});
                }
                else {
                    if(data.data === null)
                        navigate('/Not-Founded');
                }
            })
        }
    }, [value])

    return (
        <>
        {
            loading ? <Loading /> : (
                <div className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <div className="w-100">
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mb-2">
                            <p className="fs-2 fs-lg-3 fs-xl-5 fs-xxl-7 fw-bolder text-center" style={{ lineHeight: 'normal' }}>Claim is expired</p>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default ClaimPage;
