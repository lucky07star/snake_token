
import { useEffect, useState } from "react";
import { ReactComponent as IconMoney } from "../svgs/money.svg";

function TokennomicsPage() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };

        // resive event
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <div className="w-100 border border-5 border-black p-3 p-lg-4" style={{ minHeight: "82vh" }}>
            <div className="text-uppercase fs-1 fs-lg-6 fs-xl-6 font-silkscreen-bold tokenomics-title" style={{ lineHeight: 'normal' }}>TOKENOMICS</div>
            <div className="separator py-3"><div className="separator-5 separator-dashed separator-black"></div></div>
            <div className="row mb-3">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <IconMoney style={{ width: '35vh', height: 'auto' }} />
                </div>
                <div className="col-md-9">
                    <div className="fs-4 fs-lg-10 fs-xl-12 fs-xxl-14 px-4" style={{ lineHeight: 'normal' }}>FIXED SUPPLY:</div>
                    <div className="fs-4 fs-lg-9 fs-xxl-14 font-silkscreen-bold px-4" style={{ lineHeight: 'normal' }}>1 Billion $SNAKE</div>
                    <div className="separator py-4"><div className="separator-5 separator-dashed separator-black"></div></div>
                    <div className="fs-4 fs-lg-10 fs-xl-12 fs-xxl-14 px-4" style={{ lineHeight: 'normal' }}>FINAL CIRCULATION:</div>
                    <div className="fs-4 fs-lg-9 fs-xl-12 fs-xxl-14 font-silkscreen-bold px-4" style={{ lineHeight: 'normal' }}>750 Million $snake</div>
                    <div className="fs-4 fs-lg-10 fs-xl-12 fs-xxl-14 px-4" style={{ lineHeight: 'normal' }}>(250M burned)</div>
                    <div className="separator py-4"><div className="separator-5 separator-dashed separator-black"></div></div>
                    <div className="row justify-content-start">
                        <div className="col-md-12 col-lg-4">
                            <div className="fs-4 fs-lg-9 fs-xl-12 fs-xxl-13 px-4 mb-3" style={{ lineHeight: 'normal' }}>FAIR DISTRIBUTION:</div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <div className="fs-4 fs-lg-10 fs-xl-12 fs-xxl-14 px-4" style={{ lineHeight: 'normal' }}>Community Mining: <span className="font-silkscreen-bold">33.3%</span></div>
                            <div className="fs-4 fs-lg-10 fs-xl-12 fs-xxl-14 px-4" style={{ lineHeight: 'normal' }}>Liquidity & MM: <span className="font-silkscreen-bold">20%</span></div>
                            <div className="fs-4 fs-lg-10 fs-xl-12 fs-xxl-14 px-4" style={{ lineHeight: 'normal' }}>Ecosystem DAO: <span className="font-silkscreen-bold">23.3%</span></div>
                            <div className="fs-4 fs-lg-10 fs-xl-12 fs-xxl-14 px-4" style={{ lineHeight: 'normal' }}>Team & Dev: <span className="font-silkscreen-bold">13.3%</span></div>
                            <div className="fs-4 fs-lg-10 fs-xl-12 fs-xxl-14 px-4" style={{ lineHeight: 'normal' }}>Marketing & Growth: <span className="font-silkscreen-bold">10%</span></div>
                        </div>
                    </div>
                </div>
                <div className="separator py-4"><div className="separator-5 separator-dashed separator-black"></div></div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-9 d-flex justify-content-center">
                    <button className="border border-0 fs-4 fw-bold py-2 px-4 px-lg-5 text-green-300 bg-black">{size.width < 768 ? 'learn more →' : 'learn more about tokenomics→'}</button>
                </div>
            </div>
        </div>
    );
}

export default TokennomicsPage;
