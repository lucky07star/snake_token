
import QRCodeComponent from "../components/qrcode";

function ClaimRewards() {
    return (
        <div className="item-stretch" style={{ width: 'calc(100% - 160px)', height: '70vh' }}>
            <div className="w-100">
                <div className="fs-1" style={{ lineHeight: 'normal' }}>claim your rewards</div>
                <hr className="border border-dashed border-black border-3 opacity-100"></hr>
            </div>
            <div className="w-100 bg-black d-flex justify-content-center align-items-center p-3 p-lg-4 p-xl-5" style={{ height: 'calc(100% - 170px)' }}>
                <div className="w-100 text-center">
                    <div className="fs-5 text-light-green-950 mb-2" style={{ lineHeight: 'normal' }}>Scan code and Claim Rewards</div>
                    <div className="my-4 my-xxl-4">
                        <QRCodeComponent value={"https://snake.ai"} size={200} />
                    </div>
                    <div className="fs-6 text-light-green-950 mb-1" style={{ lineHeight: 'normal' }}>Code expires in</div>
                    <div className="fs-5 fw-bolder text-light-green-950" style={{ lineHeight: 'normal' }}>5:00 minutes</div>
                </div>
            </div>
        </div>
    )
}

export default ClaimRewards;