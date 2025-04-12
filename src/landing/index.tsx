
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import LandingHeader from '../partials/landing-header';
import FirstPage from './page1';
import SecondPage from './page2';

function LandingPage() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sid = params.get('SID');
        if (sid) {
            Cookies.set('SID', sid, { expires: 7 });
        }
    }, [])
    return (
        <>
            <LandingHeader />
            <div className='w-100 p-2 p-md-4 p-lg-4' style={{ height: '90vh' }}>
                <SecondPage />
            </div>
        </>
    );
}

export default LandingPage;
