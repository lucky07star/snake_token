
import { useEffect, useState } from "react";

import TableMiningProgress from "../partials/mining-progress-table";

import CustomTable from "../components/custom-table";
import MessageTable from "../components/message-table";

import { ReactComponent as IconHome } from "../svgs/home.svg";
import { ReactComponent as IconHomeSelected } from "../svgs/home-active.svg";
import { ReactComponent as IconMining } from "../svgs/mining.svg";
import { ReactComponent as IconMiningSelected } from "../svgs/mining-active.svg";
import { ReactComponent as IconClaim } from "../svgs/claim.svg";
import { ReactComponent as IconClaimSelected } from "../svgs/claim-active.svg";
import { ReactComponent as IconArrowUp } from '../svgs/arrow-up.svg';
import { ReactComponent as IconArrowDown } from '../svgs/arrow-down.svg';
import { ReactComponent as IconSmallSearch } from '../svgs/search-small.svg';
import { ReactComponent as IconHourGlass } from '../svgs/hourglass.svg';
import { ReactComponent as IconPause } from '../svgs/pause.svg';
import { ReactComponent as IconStop } from '../svgs/stop.svg';
import { ReactComponent as IconRefresh } from '../svgs/refresh.svg';

import TableData from '../data';

interface TweetMiningPageProps {
    page_number?: number
}

function TweetMiningPage({ page_number = 1 }: TweetMiningPageProps) {

    const [pageState, setPageState] = useState<string>('home');
    const [selectedTab, setSelectedTab] = useState<string>('dashboard');
    const [mobileState, setMobileState] = useState<boolean>(window.innerWidth < 768);
    const [showMiningProgress, setShowMiningProgress] = useState<boolean>(false);
    const [startMining, setStartMining] = useState<boolean>(false);

    const tabClicked = (tab_name: string) => {
        if (mobileState) {
            setSelectedTab(tab_name);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setMobileState(window.innerWidth < 768);
        };
        // resive event
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className="w-100 p-3" style={{ minHeight: '100vh' }}>
            {/* Tab Bars */}
            <div className="d-flex justify-content-between align-items-end gap-3 pt-md-3 mb-2 row-reverse">
                <div className={`border-bottom-5 border-bottom-dashed py-3 mobile-tab ${mobileState ? (selectedTab === 'menu' ? '' : 'border-bottom-gray text-gray-61') : ''}`} style={{ width: '130px' }} onClick={() => tabClicked('menu')}>
                    <div className="fs-2 text-center" style={{ lineHeight: 'normal' }}>MENU</div>
                </div>
                <div className={`border-bottom-5 border-bottom-dashed py-3 mobile-tab mobile-tab-fixed ${mobileState ? (selectedTab === 'dashboard' ? '' : 'border-bottom-gray text-gray-61') : ''}`} onClick={() => tabClicked('dashboard')}>
                    <div className="fs-2 text-center" style={{ lineHeight: 'normal' }}>Mine Tweets</div>
                </div>
                <div className="border-bottom-5 border-bottom-dashed py-3 mobile-tab mobile-hidden" style={{ width: '50%' }}>
                    <div className="fs-2 text-center" style={{ lineHeight: 'normal' }}>Mining Progress</div>
                </div>
            </div>
            {/* Main Components */}
            <div className="d-flex justify-content-between align-items-center gap-md-3">
                {/* Menu */}
                {(() => {
                    return !mobileState || (mobileState && selectedTab === 'menu') ?
                        <div className={`${!mobileState ? 'd-flex justify-content-center align-items-center flex-wrap border border-dashed' : ''} py-5 main-menu-container`}>
                            <div className={`d-flex justify-content-center align-items-center flex-wrap ${!mobileState ? 'h-md-75' : ''}`}>
                                <div className={`w-100 d-flex justify-content-around align-items-center ${!mobileState ? '' : 'border-5 border-dashed mb-4 px-4'} cursor-pointer`} onClick={() => { setPageState('home'); setSelectedTab('dashboard'); setShowMiningProgress(false); }}>
                                    {pageState === 'home' || pageState === 'claim-rewards' ? <IconHomeSelected className="main-menu-icon" /> : <IconHome className="main-menu-icon" />}
                                    {mobileState ? <div className="m-0 fs-1 text-center" style={{ lineHeight: 'normal' }}>Home</div> : ''}
                                </div>
                                <div className={`w-100 d-flex justify-content-around align-items-center ${!mobileState ? '' : 'border-5 border-dashed mb-4 px-4'} cursor-pointer`} onClick={() => { setPageState('mining'); setSelectedTab('dashboard'); setShowMiningProgress(false); }}>
                                    {pageState === 'mining' ? <IconMiningSelected className="main-menu-icon" /> : <IconMining className="main-menu-icon" />}
                                    {mobileState ? <div className="m-0 fs-1 text-center" style={{ lineHeight: 'normal' }}>Mining</div> : ''}
                                </div>
                                <div className={`w-100 d-flex justify-content-around align-items-center ${!mobileState ? '' : 'border-5 border-dashed mb-4 px-4'} cursor-pointer`} onClick={() => { setPageState('claim'); setSelectedTab('dashboard'); setShowMiningProgress(false); }}>
                                    {pageState === 'claim' ? <IconClaimSelected className="main-menu-icon" /> : <IconClaim className="main-menu-icon" />}
                                    {mobileState ? <div className="m-0 fs-1 text-center" style={{ lineHeight: 'normal' }}>Claim</div> : ''}
                                </div>
                            </div>
                        </div> : ''
                })()}
                {/* Dashboard */}
                {(() => {
                    return !mobileState || (mobileState && selectedTab === 'dashboard' && !showMiningProgress) ?
                        <div className="item-stretch mobile-item mobile-item-fixed" style={{ height: 'calc(100vh - 130px)' }}>
                            {(() => {
                                if (pageState === 'home') {
                                    return <div className="item-stretch border-dashed" style={{ height: `${page_number === 1 ? 'calc(65vh - 130px)' : 'calc(60vh - 130px)'}` }}>
                                        <div className="w-100 py-md-3 py-lg-5 border-5">
                                            {
                                                mobileState ? <div className="d-flex justify-content-center align-items-center text-center">
                                                    <div className="my-3 text-fenter fs-5" style={{ lineHeight: 'normal' }}>Search using keywords or hashtags:</div>
                                                </div> : ''
                                            }
                                            <div className='d-flex justify-content-center mb-2 text-center mb-3 px-xl-5'>
                                                <input type='text' placeholder={`${!mobileState ? 'Search using keywords or hashtags' : ''}`} className='py-1 py-xl-3 px-3' style={{ width: 'calc(100% - 75px)' }} />
                                                <button className='text-center text-white bg-black border border-0 search-button' aria-label="Search">
                                                    <IconSmallSearch />
                                                </button>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center mb-3 px-xl-5">
                                                <button className={`border border-black border-3 d-flex justify-content-center align-items-center ${(startMining && page_number === 1) || page_number === 2 ? 'bg-light-green-950' : 'bg-gray-300'} fs-6 fs-xxl-13 px-3 py-2`} style={{ lineHeight: 'normal', width: 'calc(100% - 20px)' }} onClick={() => setStartMining(true)}>
                                                    Start Mining {(startMining && page_number === 1) || page_number === 2 ? <IconHourGlass /> : null}
                                                </button>
                                            </div>
                                            {
                                                startMining && page_number === 1 ? <div className="px-3">
                                                    <div className="d-flex justify-content-around align-items-center gap-1 border-top-dashed py-3">
                                                        <button className="fs-6 fs-xxl-15 bg-green-960 border border-0 py-2 px-2 text-light-green-950">Pause <IconPause /></button>
                                                        <button className="fs-6 fs-xxl-15 bg-green-960 border border-0 py-2 px-2 text-light-green-950">Stop <IconStop /></button>
                                                    </div>
                                                    <div className="separator py-2"><div className="separator-3 separator-dashed separator-black"></div></div>
                                                </div> : ''
                                            }
                                            {
                                                page_number === 2 ? <div className="px-3">
                                                    <div className="d-flex justify-content-around align-items-center gap-1 border-top-dashed py-3 px-xl-5">
                                                        <button className="fs-6 fs-xxl-15 bg-green-960 border border-0 py-2 px-2 text-light-green-950 w-100">Regenerate <IconRefresh /></button>
                                                    </div>
                                                </div> : ''
                                            }
                                        </div>
                                    </div>
                                }
                            })()}
                            {page_number === 2 ? <MessageTable height={!mobileState ? '38vh' : '26vh'} data={TableData.message_table} /> : null}
                            {/* minized mining progress */}
                            {(() => {
                                return mobileState ? <>
                                    <div className="w-100 border-5 border-dashed d-flex justify-content-between align-items-center item-progress-accodion px-3 py-1 cursor-pointer">
                                        <div className="m-0 text-center">
                                            <span style={{ lineHeight: 'normal' }}>Mining Progress </span>
                                            <span className="text-light-green-950" style={{ lineHeight: 'normal' }}>50%</span>
                                        </div>
                                        <IconArrowUp style={{ width: '27px' }} onClick={() => setShowMiningProgress(true)} />
                                    </div>
                                </> : ''
                            })()}
                        </div> : ''
                })()}
                {/* Mining Progress */}
                {(() => {
                    return !mobileState || (showMiningProgress && selectedTab === 'dashboard') ?
                        <div className={`item-stretch ${pageState === 'claim-rewards' ? '' : 'border-bottom-dashed'} border-top-dashed`} style={{ width: `${showMiningProgress && mobileState ? '100%' : '50%'}`, minHeight: 'calc(100vh - 130px)' }}>
                            <TableMiningProgress is_mobile={mobileState} show_minized={mobileState} showedMinized={() => setShowMiningProgress(false)} container_height="calc(100vh-80px)" table={<CustomTable height="60vh" title="Mined Tweets" data={TableData.custom_table} action_icons={['like', 'reply', 'retweet', 'delete']} />} />
                        </div> : ''
                })()}
            </div>
        </div>
    );
}

export default TweetMiningPage;
