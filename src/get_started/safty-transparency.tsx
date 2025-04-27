
import { ReactComponent as IconLock } from "../svgs/lock.svg";

function SafetyTransparencyPage() {
    return (
        <div className="w-100 border border-5 border-black w-100 p-2" style={{ minHeight: "84vh" }}>
            <div className="fs-2 fs-lg-6 fs-xl-5 font-silkscreen-bold p-3 text-green-960" style={{ lineHeight: 'normal' }}>Safety & Transparency</div>
            <div className="row d-flex justify-content-center align-items-center px-3 pt-3 column-reverse">
                <div className="col-md-7 px-2">
                    <div className="separator py-3"><div className="separator-5 separator-dashed separator-black"></div></div>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <div className="custom-checkbox-container">
                            <input type="checkbox" className="custom-checkbox" id="fully_automated" />
                            <label htmlFor="fully_automated" className="custom-label"></label>
                        </div>
                        <span className="fs-6 fs-lg-11 fs-xl-12 font-silkscreen-bold text-green-960" style={{ lineHeight: 'normal' }}>Fully audited smart contracts</span>
                    </div>
                    <div className="separator py-3"><div className="separator-5 separator-dashed separator-black"></div></div>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <div className="custom-checkbox-container">
                            <input type="checkbox" className="custom-checkbox" id="alocked_liquidity_pools" />
                            <label htmlFor="alocked_liquidity_pools" className="custom-label"></label>
                        </div>
                        <span className="fs-6 fs-lg-11 fs-xl-12 font-silkscreen-bold text-green-960" style={{ lineHeight: 'normal' }}>Locked Liquidity pools (6-month lock minimum)</span>
                    </div>
                    <div className="separator py-3"><div className="separator-5 separator-dashed separator-black"></div></div>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <div className="custom-checkbox-container">
                            <input type="checkbox" className="custom-checkbox" id="burn_vesting_schedule" />
                            <label htmlFor="burn_vesting_schedule" className="custom-label"></label>
                        </div>
                        <span className="fs-6 fs-lg-11 fs-xl-12 font-silkscreen-bold text-green-960" style={{ lineHeight: 'normal' }}>Transparent token burn and vesting schedule</span>
                    </div>
                    <div className="separator py-3"><div className="separator-5 separator-dashed separator-black"></div></div>
                </div>
                <div className="col-md-5 align-self-end d-flex justify-content-center align-items-center">
                    <IconLock className="lock-size" style={{ width: '40vh' }} />
                </div>
            </div>
        </div>
    );
}

export default SafetyTransparencyPage;
