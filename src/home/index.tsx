
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Transaction, Connection, sendAndConfirmRawTransaction } from '@solana/web3.js';
import { Buffer } from "buffer";
import { useNotify } from "../hooks/useNotify";
import { usePhantom } from "../hooks/usePhantom";

// partials & components
import QRCodeComponent from "../components/qrcode";
import CustomTable from "../components/custom-table";
import TableMiningProgress from "../partials/mining-progress-table";
import WalletConnectModal from "../features/wallet/componenets/modals/wallet_connect";
import Loading from "../components/loading";
import Progressbar from "../components/progressbar";

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

import getProfile from "../features/users/apis/getProfile";
import getRewards from "../features/users/apis/getRewards";
import postClaimTx from "../features/wallet/apis/postClaimTx";
import postWalletAddress from "../features/wallet/apis/postWalletAddress";
import getTweets from "../features/users/apis/getTweets";
import { USER, REWARDS, TWEETS } from "../features/users/types";
import { alertError, alertSuccess, alertWarn } from "../utils/notify";

import TableData from "../data";

import { formatDateDifference, formatString } from "../libs";
import { fetchRewardPoolData } from "../libs/pool";
import { RewardPool } from "../types/pool";

type Props = {
    status ?: boolean
}

function Home({ status = false }: Props) {
    const location = useLocation();
    const { rewardId } = location.state || {};

    // state
    const [pageState, setPageState] = useState<string>('home');
    const [selectedTab, setSelectedTab] = useState<string>('dashboard');
    const [showMiningProgress, setShowMiningProgress] = useState<boolean>(false);
    const [mobileState, setMobileState] = useState<boolean>(window.innerWidth < 768);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [showRewardHistory, setShowRewardHistory] = useState<boolean>(false);
    const [dashboardText, setDashboardText] = useState<string>('dashboard');
    const [walletModal, setWalletModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [miningProgress, setMiningProgress] = useState<RewardPool>();

    const { notify } = useNotify();
    const { walletAvailable, connect, publicKey, disconnect } = usePhantom();
    const { value } = useParams();

    const [userInfo, setUserInfo] = useState<USER | null>(null);
    const [availableRewards, setAvailableRewards] = useState<REWARDS[] | []>([]);
    const [tweetsData, setTweetsData] = useState<TWEETS[] | []>([]);
    const [meReward, setMeReward] = useState<any>([]);
    const [tx, setTx] = useState<string>('');
    const [qrPng, setQrPng] = useState<any>();

    const getProfileAPI = getProfile();
    const getRewardsAPI = getRewards();
    const postClaimTxAPI = postClaimTx();
    const postWalletAddressAPI = postWalletAddress();
    const getTweetsAPI = getTweets();

    useEffect(() => {
        getProfileAPI().then(res => {
            setUserInfo(res.data);
        });
        getRewardsAPI({
            available: true
        }).then(data => {
            setMeReward(data.data);
        });
        getTweetsAPI({}).then(res => {
            setTweetsData(res.data)
        });
        const getRewardPool = async () => {
            const data = await fetchRewardPoolData();
            setMiningProgress(data);
        };
        getRewardPool();
    }, [pageState])

    useEffect(() => {
        getProfileAPI().then(res => {
            setUserInfo(res.data);
        });
        getRewardsAPI({
            available: true
        }).then(data => {
            setMeReward(data.data);
        });
        getTweetsAPI({}).then(res => {
            setTweetsData(res.data)
        })
        if (String(value) === "claim")
            handleRewards();
        const getRewardPool = async () => {
            const data = await fetchRewardPoolData();
            setMiningProgress(data)
        }
        getRewardPool()
    }, [value])

    useEffect(() => {
        const run = async () => {
            const { solana } = window as any;
            if (!solana?.isPhantom) {
                // alert("Phantom not found");
                notify(alertError("Phantom not found"));
                return;
            }

            try {
                setLoading(true);
                await solana.connect();

                const connection = new Connection(process.env.REACT_APP_NETWORK as string);

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

                // console.log("Here2", rawTx);

                const tSig = await sendAndConfirmRawTransaction(connection, rawTx, {
                    skipPreflight: true,
                });
                console.log("✅ Transaction Signature:", tSig);
                // alert(`✅ Transaction Signature:${tSig}`);
                notify(alertSuccess(`✅ Transaction Signature:${tSig}`));

                const data = await fetchRewardPoolData();
                setMiningProgress(data);

                setLoading(false);
            } catch (err) {
                console.error("Transaction error:", err);
                // alert(`Transaction error: ${err}`);
                notify(alertSuccess(`Transaction error: ${err}`));
                setLoading(false);
            }
        };
        if (tx !== '')
            run();
    }, [tx]);

    const tabClicked = (tab_name: string) => {
        if (mobileState) {
            setSelectedTab(tab_name);
        }
    }

    const handleModal = () => {
        setWalletModal(true);
    }

    const clsoeModal = () => {
        setWalletModal(false)
    }

    const handleWallet = () => {
        // disconnectPhantom()
        if (publicKey === null || publicKey === "") {
            connect().then(data => {
                if (userInfo?.wallet_address === "" || userInfo?.wallet_address === null || userInfo?.wallet_address === undefined) {
                    notify(alertWarn("Wallet Address can be updated! \n Do you make sure to set this wallet address?"));
                    // alert("Wallet Address can be updated! \n Do you make sure to set this wallet address?");

                    if (!walletAvailable) {
                        notify(alertWarn("Phantom Walllet is not available on this browser."));
                        // alert("Phantom Walllet is not available on this browser.");
                        clsoeModal();
                        return;
                    }

                    postWalletAddressAPI({
                        "wallet_address": data
                    }).then(resp => {
                        console.log("res", resp.data)
                        setUserInfo(resp.data);
                        clsoeModal();
                    })
                }
                else {
                    if (userInfo?.wallet_address !== data as string) {
                        notify(alertWarn(`You have already set your phantom wallet. \n You must connect to that wallet (${userInfo?.wallet_address})`));
                        // alert(`You have already set your phantom wallet. \n You must connect to that wallet (${userInfo?.wallet_address})`);
                        disconnect();
                        clsoeModal();
                    }
                }
            });
            clsoeModal();
        } else {
            if (publicKey !== userInfo?.wallet_address) {
                notify(alertWarn(`You have already set your phantom wallet. \n You must connect to that wallet (${userInfo?.wallet_address})`));
                // alert(`You have already set your phantom wallet. \n You must connect to that wallet (${userInfo?.wallet_address})`);
                disconnect();
                clsoeModal();
            }
            clsoeModal();
        }
    }

    const handleClaim = () => {
        if(status === false || rewardId === undefined) {
            // alert("You must access claim page through twitter!");
            notify(alertWarn("You must access claim page through twitter!"));
            return;
        } else {
            postClaimTxAPI({
                "reward_id": rewardId
            }).then((data: any) => {
                if(data.result)
                    setTx(data.data);
                else 
                    notify(alertWarn("You must access claim page through twitter!"));
                    // alert("You must access claim page through twitter!");
            });
        }
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
            setWindowWidth(window.innerWidth);
            setMobileState(window.innerWidth < 768);
        };
        // resive event
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <>
            {
                loading ? <Loading /> : (
                    <div className="w-100 p-3" style={{ minHeight: '100vh' }}>
                        <WalletConnectModal show={walletModal} handleClose={clsoeModal} connectWallet={handleWallet} />
                        {/* Tab Bars */}
                        <div className="d-flex justify-content-between align-items-end gap-3 pt-md-3 mb-2 row-reverse">
                            <div className={`border-bottom-5 border-bottom-dashed py-3 mobile-tab ${mobileState ? (selectedTab === 'menu' ? '' : 'border-bottom-gray text-gray-61') : ''}`} style={{ width: '130px' }} onClick={() => tabClicked('menu')}>
                                <div className="fs-3 text-center" style={{ lineHeight: 'normal' }}>MENU</div>
                            </div>
                            {/* progress bar for web */}
                            {
                                (() => {
                                    return !mobileState ? <>
                                        <div className={`border-bottom-5 border-bottom-dashed py-2 mobile-tab d-flex justify-content-center align-items-center gap-2`} style={{ width: 'calc(100% - 130px)' }}>
                                            <Progressbar type="solid" value={56} barColor="black" bgColor="#87B497" />
                                            <div className="">
                                                <div className="fs-7 fs-lg-12 fs-xl-13 fs-xxl-14 fw-bolder text-green-960" style={{ lineHeight: 'normal' }}>MINING PROGRESS: {(miningProgress?.tweetNumber ?? 0) / 10000}%</div>
                                                <div className="fs-7 fs-lg-12 fs-xl-13 fs-xxl-14 text-green-960" style={{ lineHeight: 'normal' }}>{miningProgress?.tweetNumber ?? 0} out of 1M tweets mined</div>
                                            </div>
                                        </div>
                                    </> : ""
                                })()
                            }
                            {/* 2 tags for mobile */}
                            {
                                (() => {
                                    return mobileState ? <>
                                        <div className={`border-bottom-5 border-bottom-dashed py-3 mobile-tab mobile-tab-fixed ${mobileState ? (selectedTab === 'dashboard' ? '' : 'border-bottom-gray text-gray-61') : ''}`} onClick={() => tabClicked('dashboard')}>
                                            <div className="fs-3 text-center" style={{ lineHeight: 'normal' }}>{dashboardText}</div>
                                        </div>
                                        <div className="border-bottom-5 border-bottom-dashed py-3 mobile-tab mobile-hidden" style={{ width: '50%' }}>
                                            <div className="fs-3 text-center" style={{ lineHeight: 'normal' }}>{pageState === 'home' ? 'All Tweets' : 'REWARD HISTORY'}</div>
                                        </div>
                                    </> : ""
                                })()
                            }
                        </div>
                        {/* Main Components */}
                        <div className="d-flex justify-content-between align-items-center gap-md-3">
                            {/* Menu */}
                            {(() => {
                                return !mobileState || (mobileState && selectedTab === 'menu') ?
                                    <div className={`${!mobileState ? 'd-flex justify-content-center align-items-center flex-wrap border border-dashed' : ''} py-5 main-menu-container`}>
                                        <div className={`d-flex justify-content-center align-items-center flex-wrap ${!mobileState ? 'h-md-75' : ''}`}>
                                            <div className={`w-100 d-flex justify-content-around align-items-center ${!mobileState ? '' : 'border-5 border-dashed mb-4 px-4'} cursor-pointer`} onClick={() => { setPageState('home'); setSelectedTab('dashboard'); setShowMiningProgress(false); setDashboardText('Dashboard'); }}>
                                                {pageState === 'home' || pageState === 'claim-rewards' ? <IconHomeSelected className="main-menu-icon" /> : <IconHome className="main-menu-icon" />}
                                                {mobileState ? <div className="m-0 fs-1 text-center" style={{ lineHeight: 'normal' }}>Home</div> : ''}
                                            </div>
                                            <div className={`w-100 d-flex justify-content-around align-items-center ${!mobileState ? '' : 'border-5 border-dashed mb-4 px-4'} cursor-pointer`} onClick={() => { handleRewards(); setSelectedTab('dashboard'); }}>
                                                {pageState === 'claim' ? <IconClaimSelected className="main-menu-icon" /> : <IconClaim className="main-menu-icon" />}
                                                {mobileState ? <div className="m-0 fs-1 text-center" style={{ lineHeight: 'normal' }}>Reward Claim</div> : ''}
                                            </div>
                                        </div>
                                    </div> : ''
                            })()}
                            {/* Dashboard */}
                            {(() => {
                                return !mobileState || (mobileState && selectedTab === 'dashboard' && !showMiningProgress) ?
                                    <div className={`${mobileState ? '' : 'item-stretch'} mobile-item mobile-item-fixed`} style={{ minHeight: `${mobileState ? 'auto' : 'calc(100vh - 130px)'}` }}>
                                        {(() => {
                                            if (pageState === 'home') {
                                                return <>
                                                    {
                                                        !mobileState ? <>
                                                            <div className={`border-bottom-5 border-bottom-dashed pb-2`}>
                                                                <div className="fs-3 text-center" style={{ lineHeight: 'normal' }}>{dashboardText}</div>
                                                            </div>
                                                        </> : <>
                                                            <div className="py-3 mb-2 d-flex justify-content-center align-items-center gap-3 bg-black rounded-4">
                                                                <Progressbar type="solid" value={56} borderColor="#A9E000" size="small" />
                                                                <div className="fs-7 text-light-green-950" style={{ lineHeight: 'normal', textOverflow: 'break-all' }}>{miningProgress?.tweetNumber ?? 0} out of 1M tweets mined</div>
                                                            </div>
                                                        </>
                                                    }
                                                    <div className="d-flex align-items-center w-100 border border-dashed border-5 p-1 mt-2">
                                                        <IconColoredLogo className="mx-1" />
                                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                            <div className="mx-2 fs-6 fs-xl-13 fs-xxl-15 font-gotham">Hello,</div>
                                                            <div className="fs-6 fs-xl-13 fs-xxl-14" style={{ color: '#D7263D' }}>{userInfo?.twitter_username}</div>
                                                        </div>
                                                    </div>
                                                    <div className={`py-md-3 p-1 border-bottom-5 ${mobileState ? 'border-dashed p-3' : 'border-bottom-dashed'} item-stretch mt-2`} style={{ minHeight: `${mobileState ? 'auto' : 'calc(100vh - 320px)'}` }}>
                                                        <div className="mb-4">
                                                            <div className={`fs-6 fs-lg-11 fs-xl-12 fw-bolder ${ mobileState ? 'text-center pb-4' : ''}`} style={{ lineHeight: 'normal' }}>REWARD BALANCE:</div>
                                                            {
                                                                mobileState ? "" : <div className="separator py-4"><div className="separator-3 separator-dashed separator-black"></div></div>
                                                            }
                                                            <div className="py-2 px-2 border border-3 rounded-1 border-black bg-light-green-950 text-center d-flex justify-content-center align-items-center gap-2">
                                                                <div className="fs-4 fs-xl-9 fs-xxl-8 fw-bolder">{userInfo?.reward_balance} </div>
                                                                <span className="fs-6 fs-lg-12 fs-xl-13">SNAKES</span>
                                                            </div>
                                                        </div>
                                                        {/* <div className="separator py-2"><div className="separator-3 separator-dashed separator-black"></div></div>
                                                        <div className="w-100 py-2">
                                                            <div className="w-100 d-flex justify-content-center">
                                                                <button className="border border-4 border-black bg-gray-300 w-75 py-3 fs-6 fs-xl-11 fs-xxl-13 w-100" style={{ lineHeight: 'normal' }} onClick={handleRewards}>Your Rewards</button>
                                                            </div>
                                                        </div> */}
                                                        {
                                                            mobileState ? <div className="separator py-4"><div className="separator-3 separator-dashed separator-black"></div></div> : ''
                                                        }
                                                        <div className="">
                                                            <div className={`fs-6 fs-lg-11 fs-xl-12 fw-bolder ${mobileState ? 'text-center pb-4' : ''}`}>ENGAGEMENT METRICS:</div>
                                                            {
                                                                mobileState ? "" : <div className="separator py-4"><div className="separator-3 separator-dashed separator-black"></div></div>
                                                            }
                                                            <div className="w-100 border border-light-green-950 border-3 py-3 px-2 text-center bg-green-950 rounded-2 d-flex justify-content-center align-items-center gap-2">
                                                                <div className="fs-4 fs-xl-9 fs-xxl-8 fw-bolder text-light-green-950">{userInfo?.tweets} </div>
                                                                <span className="fs-9 fs-xl-14 fs-xxl-15 text-green-300">Tweets</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            } else if (pageState === 'claim-rewards') {
                                                return <>
                                                {
                                                    mobileState ? <>
                                                        <div className="py-3 mb-2 d-flex justify-content-center align-items-center gap-3 bg-black rounded-4">
                                                            <Progressbar type="solid" value={56} borderColor="#A9E000" size="small" />
                                                            <div className="fs-7 text-light-green-950" style={{ lineHeight: 'normal', textOverflow: 'break-all' }}>{miningProgress?.tweetNumber ?? 0} out of 1M tweets mined</div>
                                                        </div>
                                                    </> : ''
                                                }
                                                    <div className="py-md-3 p-1 border-bottom-5 border-bottom-dashed bg-black d-flex justify-content-center align-items-center flex-wrap" style={{ minHeight: `${!mobileState ? 'calc(100vh - 260px)' : (!showRewardHistory ? 'calc(100vh - 350px)' : '150px')}` }}>
                                                        <div className="w-100 text-center">
                                                            {/* {
                                                                meReward.length !== 0 && <div className="fs-5 text-light-green-950 mb-2" style={{ lineHeight: 'normal' }}>Scan code and Claim Rewards</div>
                                                            } */}
                                                            <div className="my-4 my-xxl-4" style={{ color: 'white' }}>
                                                                {
                                                                    meReward.length === 0 ? "come back after 24hs of you claim your reward and KEEP MINING! 🐍--SSSSS--🐍" :
                                                                        // <QRCodeComponent value={"https://snake.ai"} size={144} />
                                                                        // <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/qrcode/${meReward[0].id}`} alt="QR Code" width={224} />
                                                                        "come back after 24hs of you claim your reward and KEEP MINING! 🐍--SSSSS--🐍"
                                                                }
                                                            </div>
                                                            {/* {
                                                                meReward.length !== 0 && (
                                                                    <>
                                                                        <div className="fs-6 text-light-green-950 mb-1" style={{ lineHeight: 'normal' }}>Code expires in</div>
                                                                        <div className="fs-5 fw-bolder text-light-green-950" style={{ lineHeight: 'normal' }}>5:00 minutes</div>
                                                                    </>
                                                                )
                                                            } */}
                                                        </div>
                                                        {
                                                            mobileState && !showRewardHistory ? (
                                                                <div className="w-100">
                                                                    <div className="border-bottom-dashed border-top-dashed py-1 d-flex justify-content-center w-100">
                                                                        {
                                                                            meReward.length === 0 ? <a href={`https://x.com/${userInfo?.twitter_username}`} className="fs-6 fs-xl-12 fs-xxl-14 bg-light-green-950 border border-3 border-black p-2 px-4 w-100 text-center" style={{ textDecoration: 'none', color: 'black' }}>START MINING!</a> : publicKey as string === userInfo?.wallet_address ? (
                                                                                <button onClick={handleClaim} className="fs-6 fs-xl-12 fs-xxl-14 bg-light-green-950 border border-3 border-black p-2 px-5 w-100 text-center">Claim Now!</button>
                                                                            ) : (
                                                                                <button onClick={handleClaim} className="fs-6 fs-xl-12 fs-xxl-14 bg-secondary cursor-no-drop border border-3 border-black p-2 px-5 w-100 text-center" style={{ cursor: 'no-drop' }} disabled>Claim Now!</button>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div className="border-bottom-dashed border-top-dashed py-1 d-flex justify-content-center w-100">
                                                                        <button onClick={handleModal} className="text-truncate fs-6 fs-xl-12 fs-xxl-14 bg-gray-400 border border-3 border-black p-2 px-5 w-100 text-center">
                                                                            {
                                                                                publicKey ? formatString(publicKey) : "Connect Wallet"
                                                                            }
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : ''
                                                        }
                                                    </div>
                                                    {
                                                        !mobileState ?
                                                            <div className="border-bottom-dashed border-top-dashed py-4 d-flex justify-content-end">
                                                                {
                                                                    meReward.length === 0 ? <a href={`https://x.com/${userInfo?.twitter_username}`} className="fs-6 fs-xl-12 fs-xxl-14 bg-light-green-950 border border-3 border-black p-2 px-4" style={{ textDecoration: 'none', color: 'black' }}>START MINING!</a> : publicKey as string === userInfo?.wallet_address ? (
                                                                        <button onClick={handleClaim} className="fs-6 fs-xl-12 fs-xxl-14 bg-light-green-950 border border-3 border-black p-2 px-5">Claim Now!</button>
                                                                    ) : (
                                                                        <button onClick={handleClaim} className="fs-6 fs-xl-12 fs-xxl-14 bg-secondary cursor-no-drop border border-3 border-black p-2 px-5" style={{ cursor: 'no-drop' }} disabled>Claim Now!</button>
                                                                    )
                                                                }
                                                            </div> : ''
                                                    }
                                                </>
                                            }
                                        })()}
                                        {/* reward history */}
                                        {(() => {
                                            return mobileState && pageState === 'claim-rewards' ? <>
                                                <div className="w-100 border-5 border-dashed item-progress-accodion px-3 py-1 cursor-pointer mt-2">
                                                    <div className={`d-flex justify-content-between align-items-center`}>
                                                        <div className="m-0 text-center">
                                                            <span style={{ lineHeight: 'normal' }}>Reward History</span>
                                                        </div>
                                                        {showRewardHistory ? <IconArrowDown style={{ width: '27px' }} onClick={() => setShowRewardHistory(false)} /> : <IconArrowUp style={{ width: '27px' }} onClick={() => setShowRewardHistory(true)} />}
                                                    </div>
                                                    {showRewardHistory ? <CustomTable height="calc(100vh - 500px)" title="Reward History" data={availableRewards.map(item => ({
                                                        text: `${item?.reward_amount} Snake tokens`,
                                                        date: formatDateDifference(item?.block_time ?? ""),
                                                        url: `https://x.com/${item.twitter_username}/status/${item.tweet_twitter_id}`
                                                    }))} action_icons={['retweet', 'delete']} /> : ''}
                                                </div>
                                            </> : ''
                                        })()}
                                        {/* minized mining progress */}
                                        {(() => {
                                            return mobileState && pageState === 'claim-rewards' ? <>
                                                <div className="w-100 border-5 border-dashed d-flex justify-content-between align-items-center item-progress-accodion px-3 py-1 cursor-pointer mt-2">
                                                    <div className="m-0 text-center">
                                                        <span style={{ lineHeight: 'normal' }}>All Tweets</span>
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
                                    <div className={`item-stretch ${mobileState ? 'border-dashed py-1 px-2' : pageState === 'claim-rewards' ? '' : 'border-bottom-dashed'}`} style={{ width: `${showMiningProgress && mobileState ? '100%' : '50%'}`, minHeight: 'calc(100vh - 130px)' }}>
                                        {
                                            pageState === 'claim-rewards' ? <>
                                                <TableMiningProgress is_mobile={mobileState} show_minized={mobileState} showedMinized={() => setShowMiningProgress(false)} container_height="calc(100vh-80px)" table={<CustomTable height={`${mobileState ? 'calc(100vh - 210px)' : 'calc(100vh - 270px)'}`} title="Reward History" data={availableRewards.map(item => ({
                                                    text: `${item?.reward_amount} Snake tokens`,
                                                    date: formatDateDifference(item?.block_time ?? ""),
                                                    url: `https://x.com/${item.twitter_username}/status/${item.tweet_twitter_id}`
                                                }))} action_icons={['retweet', 'delete']} />} />
                                                {
                                                    !mobileState ?
                                                        <div className="border-bottom-dashed border-top-dashed py-4 d-flex justify-content-start">
                                                            <button onClick={handleModal} className="text-truncate fs-6 fs-xl-12 fs-xxl-14 bg-gray-400 border border-3 border-black p-2 px-5">
                                                                {
                                                                    publicKey ? formatString(publicKey) : "Connect Wallet"
                                                                }
                                                            </button>
                                                        </div>
                                                        :
                                                        ''
                                                }
                                            </> : <>
                                                {
                                                    !mobileState ? <>
                                                        <div className={`border-bottom-5 border-bottom-dashed pb-2`}>
                                                            <div className="fs-3 text-center" style={{ lineHeight: 'normal' }}>{pageState === 'home' ? 'All Tweets' : 'REWARD HISTORY'}</div>
                                                        </div>
                                                    </> : ""
                                                }
                                                <TableMiningProgress is_mobile={mobileState} show_minized={mobileState} showedMinized={() => setShowMiningProgress(false)} container_height="calc(100vh-80px)" table={<CustomTable height={`${mobileState ? 'calc(100vh - 210px)' : 'calc(100vh - 210px)'}`} title="All Tweets" data={tweetsData.map(data => ({
                                                    text: `${data?.twitter_username}'s TWEET`,
                                                    date: formatDateDifference(data?.created_at ?? ""),
                                                    url: `https://x.com/${data.twitter_username}/status/${data.tweet_id}`
                                                }))} action_icons={['like', 'reply', 'retweet', 'delete-white']} />} />
                                            </>
                                        }
                                    </div> : ''
                            })()}
                        </div>
                        {
                            mobileState && selectedTab === 'dashboard' && pageState === 'home' ? <>
                                <div className="border-4 border-dashed border-black p-2 mt-2">
                                    <div className={`border-bottom-5 border-bottom-dashed py-2 mb-3`}>
                                        <div className="fs-3 text-center" style={{ lineHeight: 'normal' }}>All Tweets</div>
                                    </div>
                                    <TableMiningProgress is_mobile={mobileState} container_height="240px" table={<CustomTable height={"240px"} title="All Tweets" data={tweetsData.map(data => ({
                                        text: `${data?.twitter_username}'s TWEET`,
                                        date: formatDateDifference(data?.created_at ?? ""),
                                        url: `https://x.com/${data.twitter_username}/status/${data.tweet_id}`
                                    }))} action_icons={['like', 'reply', 'retweet', 'delete-white']} />} />
                                </div>
                            </> : ""
                        }
                    </div>
                )
            }
        </>
    );
}

export default Home;
