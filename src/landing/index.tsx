
import LandingHeader from '../partials/landing-header';
import FirstPage from './page1';
import SecondPage from './page2';

function LandingPage() {
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
