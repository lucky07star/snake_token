
import Progressbar from "../components/progressbar";

import { ReactComponent as IconArrowDown } from "../svgs/arrow-down.svg";

interface TableMiningProgressProps {
    container_height: string,
    is_mobile?: boolean,
    table?: React.ReactNode,
    show_minized?: boolean,
    showedMinized?: () => void
}

function TableMiningProgress({ container_height = '80vh', is_mobile = false, table = null, show_minized = false, showedMinized = () => { } }: TableMiningProgressProps) {
    return (
        <div className="w-100" style={{ minHeight: `${container_height}` }}>
            {
                show_minized ? <div className="w-100 border-5 d-flex justify-content-between align-items-center item-progress-accodion px-3 py-1 cursor-pointer">
                    <div className="m-0 text-center fs-5">
                        <span className="text-green-960" style={{ lineHeight: 'normal' }}>Mined Tweets</span>
                        {/* <span className="text-light-green-950" style={{ lineHeight: 'normal' }}>50%</span> */}
                    </div>
                    <IconArrowDown style={{ width: '27px' }} onClick={showedMinized} />
                </div> : ''
            }
            {/* <div className="border-bottom-dashed d-flex justify-content-center align-items-center gap-2 gap-lg-4 py-3 mb-3">
                <span className="fs-5 fs-xxl-9 font-gotham">{is_mobile ? 'Lv5' : 'Level5'}</span>
                <Progressbar value={5} />
                <span className="fs-5 fs-xxl-9 font-gotham">{is_mobile ? 'Lv6' : 'Level6'}</span>
            </div> */}
            {table === null ? null : table}
        </div>
    )
}

export default TableMiningProgress;