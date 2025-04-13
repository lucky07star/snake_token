
import { ReactComponent as IconHomeSelected } from "../svgs/home-active.svg";
import { ReactComponent as IconMining } from "../svgs/mining.svg";
import { ReactComponent as IconClaim } from "../svgs/claim.svg";

function Menu() {
    return (
        <div className="item-stretch" style={{ minHeight: '86vh' }}>
            <div className="w-100 border-bottom-5 border-bottom-dashed py-3">
                <div className="fs-2 text-center" style={{ lineHeight: 'normal' }}>MENU</div>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-wrap border border-dashed border-black border-3 main-menu-container" style={{ maxWidth: '130px', height: '75vh' }}>
                <IconHomeSelected className="main-menu-icon" />
                <IconMining className="main-menu-icon" />
                <IconClaim className="main-menu-icon" />
            </div>
        </div>
    )
}

export default Menu;
