
import { ReactComponent as IconSmallLogo } from "../svgs/logo-small.svg";

function MainHeader() {
    return (
        <div className="d-flex justify-content-between align-items-center border-bottom border-5 border-black bg-black w-100 p-2" style={{ height: '10vh' }}>
            <div className="d-flex justify-content-start align-items-center gap-2">
                <IconSmallLogo className="fs-1" />
                <span className="fs-1 fs-lg-7 fs-xl-7 text-white main-header-title">SNAKE.AI</span>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-3 h-100 px-2">
                <button className="border border-0 fs-4 fw-bold px-3" style={{ height: "6vh", backgroundColor: "#A9E000" }}>GET STARTED</button>
            </div>
        </div>
    );
}

export default MainHeader;
