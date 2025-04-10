
import { ReactComponent as IconHeart } from "../svgs/heart-solid.svg";

function LandingHeader() {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center w-100 p-2 p-md-4 p-lg-4" style={{ height: '10vh' }}>
                <div className="d-flex justify-content-start align-items-center gap-1">
                    <IconHeart style={{ width: '6vh' }} />
                    <IconHeart style={{ width: '6vh' }} />
                    <IconHeart style={{ width: '6vh' }} />
                </div>
                <div className="d-flex justify-content-start align-items-center gap-2 h-100">
                    <div className="border border-5 border-black h-75" style={{ width: "30px" }}></div>
                    <div className="border border-5 border-black h-75" style={{ width: "30px" }}></div>
                    <div className="border border-5 border-black h-75" style={{ width: "30px" }}></div>
                    <div className="border border-5 border-black h-75" style={{ width: "30px" }}></div>
                </div>
            </div>
            <div className="px-2 px-md-4 px-lg-4">
                <div className="border border-3 border-black "></div>
            </div>
        </>
    );
}

export default LandingHeader;
