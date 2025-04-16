
import { useEffect, useState } from "react";
import { Transaction, Connection, sendAndConfirmRawTransaction  } from '@solana/web3.js';
import { Buffer } from "buffer";
import { useNotify } from "../hooks/useNotify";
import { usePhantom } from "../hooks/usePhantom";

// partials & components
import TableData from "../data";
import QRCodeComponent from "../components/qrcode";
import CustomTable from "../components/custom-table";
import TableMiningProgress from "../partials/mining-progress-table";

// icons
import { ReactComponent as IconHome } from "../svgs/home.svg";
import { ReactComponent as IconHomeSelected } from "../svgs/home-active.svg";
import { ReactComponent as IconMining } from "../svgs/mining.svg";
import { ReactComponent as IconMiningSelected } from "../svgs/mining-active.svg";
import { ReactComponent as IconClaim } from "../svgs/claim.svg";
import { ReactComponent as IconClaimSelected } from "../svgs/claim-active.svg";
import { ReactComponent as IconColoredLogo } from '../svgs/logo-colored.svg';
import { ReactComponent as IconArrowUp } from '../svgs/arrow-up.svg';
import { ReactComponent as IconArrowDown } from '../svgs/arrow-down.svg';

import getMe from "../features/users/apis/getMe";
import getRewards from "../features/users/apis/getRewards";
import postClaimTx from "../features/wallet/apis/postClaimTx"; 
import postWalletAddress from "../features/wallet/apis/postWalletAddress";
import { USER, REWARDS } from "../features/users/types";
import { alertWarn } from "../utils/notify";

import { formatString } from "../libs";

function Home() {
    // state
    const [pageState, setPageState] = useState<string>('home');
    const [selectedTab, setSelectedTab] = useState<string>('dashboard');
    const [showMiningProgress, setShowMiningProgress] = useState<boolean>(false);
    const [mobileState, setMobileState] = useState<boolean>(window.innerWidth < 768);
    const [showRewardHistory, setShowRewardHistory] = useState<boolean>(false);
    const [dashboardText, setDashboardText] = useState<string>('dashboard');

    const { notify } = useNotify();
    const {walletAvailable, connect, publicKey, disconnect } = usePhantom();

    console.log("Public key", publicKey)

    const [userInfo, setUserInfo] = useState<USER | null>(null);
    const [availableRewards, setAvailableRewards] = useState<REWARDS[] | []>([]);
    const [tx, setTx] = useState<string>('')

    const getMeAPI = getMe();
    const getRewardsAPI = getRewards();
    const postClaimTxAPI = postClaimTx();
    const postWalletAddressAPI = postWalletAddress();

    useEffect(() => {
        getMeAPI().then(res => {
            setUserInfo(res.data);
        })
    }, [])
    
    useEffect(() => {
        const run = async () => {
            const { solana } = window as any;
            if (!solana?.isPhantom) {
              alert("Phantom not found");
              return;
            }
      
            try {
                await solana.connect();

                const connection = new Connection("https://api.devnet.solana.com");

                const serializedTx = tx;
                const sTx = Transaction.from(Buffer.from(serializedTx, "base64"));

                if (!sTx.feePayer || !sTx.recentBlockhash) {
                    console.error("Missing required transaction metadata");
                    return;
                }
      
                // sTx.signatures = [];
                const signedTx = await solana.signTransaction(sTx);
                console.log(signedTx.signatures);

                const rawTx = signedTx.serialize(); // returns a Buffer (or Uint8Array)
        
                console.log("Here2", rawTx);

                const tSig = await sendAndConfirmRawTransaction(connection, rawTx, {
                    skipPreflight: true,
                });
                console.log("✅ Transaction Signature:", tSig);
            } catch (err) {
              console.error("Transaction error:", err);
            }
        };
        if(tx !== '')
            run();
    }, [tx]);

    const tabClicked = (tab_name: string) => {
        if (mobileState) {
            setSelectedTab(tab_name);
        }
    }

    const handleWallet = () => {
        // disconnectPhantom()
        if(publicKey === null || publicKey === "") {
            connect().then(data => {
                if(userInfo?.wallet_address === "" || userInfo?.wallet_address === null) {
                    notify(alertWarn("Wallet Address can be updated! \n Do you make sure to set this wallet address?"));
                    alert("Wallet Address can be updated! \n Do you make sure to set this wallet address?");

                    if(!walletAvailable) {
                        notify(alertWarn("Phantom Walllet is not available on this browser."));
                        alert("Phantom Walllet is not available on this browser.");
                        return;
                    }

                    postWalletAddressAPI({
                        "wallet_address": data
                    }).then(resp => {
                        console.log("res", resp.data)
                        setUserInfo(resp.data);
                    })
                }
                else {
                    if(userInfo?.wallet_address !== data as string) {
                        notify(alertWarn(`You have already set your phantom wallet. \n You must connect to that wallet (${userInfo?.wallet_address})`));
                        alert(`You have already set your phantom wallet. \n You must connect to that wallet (${userInfo?.wallet_address})`);
                        disconnect();
                    }
                }
            })
        } else {
            if(publicKey !== userInfo?.wallet_address) {
                notify(alertWarn(`You have already set your phantom wallet. \n You must connect to that wallet (${userInfo?.wallet_address})`));
                alert(`You have already set your phantom wallet. \n You must connect to that wallet (${userInfo?.wallet_address})`);
                disconnect();
            }
        }  
    }

    const handleClaim = () => {
        postClaimTxAPI().then(data => {
            setTx(data.data);
        });
    }

    const handleRewards = () => {
        setPageState("claim-rewards"); 
        setDashboardText("claim your rewards");
        getRewardsAPI({
            offset: 0,
            limit: 10,
            available: false
        }).then(data => {
            setAvailableRewards(data.data)
        })
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
                    <div className="fs-2 text-center" style={{ lineHeight: 'normal' }}>{dashboardText}</div>
                </div>
                <div className="border-bottom-5 border-bottom-dashed py-3 mobile-tab mobile-hidden" style={{ width: '50%' }}>
                    <div className="fs-2 text-center" style={{ lineHeight: 'normal' }}>Mining Progress</div>
                </div>
            </div>
            {/* Main Components */}
            <div className="d-flex justify-content-between align-items-center gap-md-3" style={{ minHeight: 'calc(100vh - 130px)' }}>
                {/* Menu */}
                {(() => {
                    return !mobileState || (mobileState && selectedTab === 'menu') ?
                        <div className={`${!mobileState ? 'd-flex justify-content-center align-items-center flex-wrap border border-dashed' : ''} py-5 main-menu-container`}>
                            <div className={`d-flex justify-content-center align-items-center flex-wrap ${!mobileState ? 'h-md-75' : ''}`}>
                                <div className={`w-100 d-flex justify-content-around align-items-center ${!mobileState ? '' : 'border-5 border-dashed mb-4 px-4'} cursor-pointer`} onClick={() => { setPageState('home'); setSelectedTab('dashboard'); setShowMiningProgress(false); setDashboardText('Dashboard'); }}>
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
                        <div className="item-stretch mobile-item mobile-item-fixed" style={{ minHeight: 'calc(100vh - 130px)' }}>
                            {(() => {
                                if (pageState === 'home') {
                                    return <>
                                        <div className="d-flex align-items-center w-100 border border-dashed border-5 p-1">
                                            <IconColoredLogo className="mx-1" />
                                            <span className="mx-2 fs-6 fs-xl-13 fs-xxl-15 font-gotham">Hello,</span>
                                            <span className="fs-6 fs-xl-13 fs-xxl-14" style={{ color: '#D7263D' }}>{userInfo?.twitter_username}</span>
                                        </div>
                                        <div className="py-md-3 p-1 border-bottom-5 border-bottom-dashed item-stretch item-dash" style={{ minHeight: 'calc(100vh - 240px)' }}>
                                            <div className="py-2 d-flex justify-content-between align-items-center">
                                                <span className="fs-6 fs-lg-11 fs-xl-12 fw-bolder" style={{ lineHeight: 'normal' }}>REWARD BALANCE:</span>
                                                <span className="py-2 px-2 border border-4 border-black rounded-4 bg-light-green-950 text-center fs-6 fs-lg-12 fs-xl-13">123,456 SNAKES</span>
                                            </div>
                                            <div className="separator py-2"><div className="separator-3 separator-dashed separator-black"></div></div>
                                            <div className="w-100 py-2">
                                                <div className="w-100 d-flex justify-content-center">
                                                    <button className="border border-4 border-black bg-gray-300 w-75 py-3 fs-6 fs-xl-11 fs-xxl-13 w-100" style={{ lineHeight: 'normal' }} onClick={handleRewards}>Your Rewards</button>
                                                </div>
                                            </div>
                                            <div className="separator py-2"><div className="separator-3 separator-dashed separator-black"></div></div>
                                            <span className="fs-6 fs-lg-11 fs-xl-12 fw-bolder">REWARD BALANCE:</span>
                                            <div className="separator py-2"><div className="separator-3 separator-dashed separator-black"></div></div>
                                            <div className="w-100 d-flex justify-content-center align-items-between gap-1">
                                                <div className="w-100 border border-light-green-950 border-3 py-4 px-2 text-center bg-green-950 rounded-2">
                                                    <div className="fs-4 fs-xl-9 fs-xxl-8 fw-bolder text-light-green-950">42</div>
                                                    <div className="fs-8 fs-xl-13 fs-xxl-14 text-green-300">Tweets</div>
                                                </div>
                                                <div className="w-100 border border-light-green-950 border-3 py-4 px-2 text-center bg-green-950 rounded-2">
                                                    <div className="fs-4 fs-xl-9 fs-xxl-8 fw-bolder text-light-green-950">189</div>
                                                    <div className="fs-8 fs-xl-13 fs-xxl-14 text-green-300">Likes</div>
                                                </div>
                                                <div className="w-100 border border-light-green-950 border-3 py-4 px-2 text-center bg-green-950 rounded-2">
                                                    <div className="fs-4 fs-xl-9 fs-xxl-8 fw-bolder text-light-green-950">87</div>
                                                    <div className="fs-8 fs-xl-13 fs-xxl-14 text-green-300">Replies</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                } else if (pageState === 'claim-rewards') {
                                    return <>
                                        <div className="py-md-3 p-1 border-bottom-5 border-bottom-dashed bg-black d-flex justify-content-center align-items-center" style={{ minHeight: `${showRewardHistory ? 'calc(100vh - 480px)' : 'calc(100vh - 300px)'}` }}>
                                            <div className="w-100 text-center">
                                                <div className="fs-5 text-light-green-950 mb-2" style={{ lineHeight: 'normal' }}>Scan code and Claim Rewards</div>
                                                <div className="my-4 my-xxl-4">
                                                    <QRCodeComponent value={"https://snake.ai"} size={144} />
                                                </div>
                                                <div className="fs-6 text-light-green-950 mb-1" style={{ lineHeight: 'normal' }}>Code expires in</div>
                                                <div className="fs-5 fw-bolder text-light-green-950" style={{ lineHeight: 'normal' }}>5:00 minutes</div>
                                            </div>
                                        </div>
                                        {
                                            !mobileState ?
                                                <div className="border-bottom-dashed border-top-dashed py-4 d-flex justify-content-end">
                                                {
                                                    publicKey as string === userInfo?.wallet_address ? (
                                                        <button onClick={handleClaim} className="fs-6 fs-xl-12 fs-xxl-14 bg-light-green-950 border border-3 border-black p-2 px-5">Claim Now!</button>
                                                    ) : (
                                                        <button onClick={handleClaim} className="fs-6 fs-xl-12 fs-xxl-14 bg-light-green-950 border border-3 border-black p-2 px-5" disabled>Claim Now!</button>
                                                    )
                                                }    
                                                </div>
                                                :
                                                ''
                                        }
                                    </>
                                }
                            })()}
                            {/* reward history */}
                            {(() => {
                                return mobileState && pageState === 'claim-rewards' ? <>
                                    <div className="w-100 border-5 border-dashed item-progress-accodion px-3 py-1 cursor-pointer">
                                        <div className={`d-flex justify-content-between align-items-center`}>
                                            <div className="m-0 text-center">
                                                <span style={{ lineHeight: 'normal' }}>Reward History</span>
                                            </div>
                                            {showRewardHistory ? <IconArrowDown style={{ width: '27px' }} onClick={() => setShowRewardHistory(false)} /> : <IconArrowUp style={{ width: '27px' }} onClick={() => setShowRewardHistory(true)} />}
                                        </div>
                                        {showRewardHistory ? <CustomTable height="120px" title="reward history" data={availableRewards.map(item => ({
                                            text: `${item?.reward_amount} Snake tokens`,
                                            date: item?.created_at 
                                        }))} action_icons={['like', 'reply', 'retweet', 'delete']} /> : ''}
                                    </div>
                                </> : ''
                            })()}
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
                        <div className={`item-stretch ${mobileState ? 'border-dashed py-3 px-2' : pageState === 'claim-rewards' ? '' : 'border-bottom-dashed'} border-top-dashed`} style={{ width: `${showMiningProgress && mobileState ? '100%' : '50%'}`, minHeight: 'calc(100vh - 130px)' }}>
                            {
                                pageState === 'claim-rewards' ? <>
                                    <TableMiningProgress is_mobile={mobileState} show_minized={mobileState} showedMinized={() => setShowMiningProgress(false)} container_height="calc(100vh-80px)" table={<CustomTable height="41vh" title="reward history" data={availableRewards.map(item => ({
                                            text: `${item?.reward_amount} Snake tokens`,
                                            date: item?.created_at 
                                        }))} action_icons={['like', 'reply', 'retweet', 'delete']} />} />
                                    {
                                        !mobileState ?
                                            <div className="border-bottom-dashed border-top-dashed py-4 d-flex justify-content-start">
                                                <button onClick={handleWallet} className="text-truncate fs-6 fs-xl-12 fs-xxl-14 bg-gray-400 border border-3 border-black p-2 px-5">
                                                {
                                                    publicKey ? formatString(publicKey) : "Link Wallet"
                                                }
                                                </button>
                                            </div>
                                            :
                                            ''
                                    }
                                </> : <TableMiningProgress is_mobile={mobileState} show_minized={mobileState} showedMinized={() => setShowMiningProgress(false)} container_height="calc(100vh-80px)" table={<CustomTable height="60vh" title="Mined Tweets" data={TableData.custom_table} action_icons={['like', 'reply', 'retweet', 'delete']} />} />
                            }
                        </div> : ''
                })()}
            </div>
        </div>
    );
}

export default Home;
