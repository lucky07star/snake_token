
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Home from '../home';
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
                    navigate(`/home/1`)
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
