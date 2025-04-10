
import { ReactComponent as IconHome } from "../svgs/home.svg";
import { ReactComponent as IconMessage } from "../svgs/message.svg";
import { ReactComponent as IconCircle } from "../svgs/circle.svg";
import { ReactComponent as IconSave } from "../svgs/save.svg";

function Menu() {
    return (
        <div className="item-stretch" style={{ height: '86vh' }}>
            <div className="w-100">
                <div className="fs-1 text-center" style={{ lineHeight: 'normal' }}>MENU</div>
                <hr className="border border-dashed border-black border-3 opacity-100"></hr>
            </div>
            <div className="d-flex justify-content-center align-items-center border border-dashed border-black border-3" style={{ width: '130px', height: '75vh' }}>
                <div className="w-100 text-center">
                    <IconHome className="py-3" style={{ width: '57%', height: 'auto' }} />
                    <IconMessage className="py-3" style={{ width: '57%', height: 'auto' }} />
                    <IconCircle className="py-3" style={{ width: '57%', height: 'auto' }} />
                    <IconSave className="py-3" style={{ width: '57%', height: 'auto' }} />
                </div>
            </div>
        </div>
    )
}

export default Menu;