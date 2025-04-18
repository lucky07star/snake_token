
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import getRewardsCheck from '../features/wallet/apis/getRewardsCheck';

function ClaimPage() {
    const { value } = useParams();
    const navigate = useNavigate();

    const getRewardsCheckAPI = getRewardsCheck();

    useEffect(() => {
        if(value) {
            getRewardsCheckAPI({
                "reward_id": value
            }).then(data => {
                if(data.result){
                    if(data.data)
                        navigate(`/home/claim`);
                    else if (data.data == null)
                        navigate('/Not-Founded');
                }
            })
        }
    }, [value])

    return (
        <div>
            <p>Claim is expired</p>
        </div>
    );
}

export default ClaimPage;
