
import MainHeader from '../partials/main-header';

import DashboardPage from './dashboard';
import WhatIsSnakePage from './what-is-snake';
import HowItWorksPage from './how-it-works'; // needs to fix
import TokennomicsPage from './tokenomics';
import RoadmapPage from './roadmap';
import SafetyTransparencyPage from './safety-transparency';
import WhyJoinPage from './safety-transparency/why-join';
import GetInvolvedPage from './safety-transparency/get-involved';

interface GetStartedPageProps {
    pagename?: string
}

function GetStartedPage({ pagename = 'dashboard' }: GetStartedPageProps) {
    return (
        <>
            <MainHeader />
            <div className='w-100 p-2 p-md-4 p-lg-4' style={{ minHeight: '90vh' }}>
                {(() => {
                    let page = null;
                    switch (pagename) {
                        case 'dashboard':
                            page = <DashboardPage />
                            break;
                        case 'what-is-snake':
                            page = <WhatIsSnakePage />
                            break;
                        case 'how-it-works':
                            page = <HowItWorksPage />
                            break;
                        case 'tokenomics':
                            page = <TokennomicsPage />
                            break;
                        case 'roadmap':
                            page = <RoadmapPage />
                            break;
                        case 'safety-transparency':
                            page = <SafetyTransparencyPage />
                            break;
                        case 'why-join':
                            page = <WhyJoinPage />
                            break;
                        case 'get-involved':
                            page = <GetInvolvedPage />
                            break;
                        default:
                            page = null;
                            break;
                    }
                    return page;
                })()}
            </div>
        </>
    );
}

export default GetStartedPage;
