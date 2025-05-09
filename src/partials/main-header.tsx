
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconSmallLogo } from "../svgs/logo-small.svg";
import getSession from "../features/users/apis/getSession";

function MainHeader() {
    const navigate = useNavigate()
    const [authStatus, setAuthStatus] = useState<boolean>(false);

    const getSessionAPI = getSession();

    useEffect(() => {
        getSessionAPI().then(res => {
            res.result ? setAuthStatus(true) : setAuthStatus(false);
        }).catch(() => {
            setAuthStatus(false);
        })
    }, [])

    return (
        <>
            <div style={{ height: '10vh' }}></div>
            <div className="main-header d-flex fixed-top justify-content-between align-items-center border-bottom border-5 border-black bg-black w-100 pt-2 px-2 px-md-4 px-lg-4 shadow-bottom" style={{ height: '10vh' }}>
                <a href="/" className="d-flex justify-content-start align-items-center gap-2" style={{textDecoration: 'none'}}>
                    <IconSmallLogo style={{ height: '10vh', width: 'auto' }} />
                    <span className="fs-1 fs-lg-8 fs-xl-8 text-white main-header-title font-silkscreen-bold">PLAYSNAKE.AI</span>
                </a>
                <div className="d-flex justify-content-end align-items-center gap-3 h-100 px-2">
                    {
                        authStatus ? (
                            <button onClick={() => navigate('/home/dashboard')} className="border border-0 fs-5 font-silkscreen-bold py-2 px-3 text-center" style={{ backgroundColor: "#A9E000", color: "black" }}>GET STARTED</button>
                        ) : (
                            <a href={`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`} className="border border-0 fs-5 font-silkscreen-bold py-2 px-3 text-decoration-none text-center" style={{ backgroundColor: "#A9E000", color: "black" }}>GET STARTED</a>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default MainHeader;
