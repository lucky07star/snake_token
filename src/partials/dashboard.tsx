
import { ReactComponent as IconColoredLogo } from '../svgs/logo-colored.svg';

function Dashboard() {
    return (
        <div className="item-stretch" style={{ width: 'calc(100% - 150px)', height: '86vh' }}>
            <div className="w-100">
                <div className="fs-1" style={{ lineHeight: 'normal' }}>DASHBOARD</div>
                <hr className="border border-dashed border-black border-3 opacity-100"></hr>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex align-items-center w-100 border border-dashed border-5 p-1">
                    <IconColoredLogo className="mx-2" />
                    <span className="mx-3 fs-4">Hello, </span>
                    <span className="fs-2" style={{ color: '#D7263D' }}>ISA47</span>
                </div>
            </div>
            <div className="py-2 d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-bolder">REWARD BALANCE:</span>
                <span className="py-2 px-2 border border-4 border-black rounded-4 bg-light-green-950">123,456 SNAKES</span>
            </div>
            <hr className="border border-dashed border-black border-3 opacity-100 my-0"></hr>
            <div className="w-100 py-2">
                <div className="w-100 d-flex justify-content-center">
                    <button className="border border-4 border-black bg-gray-300 w-75 py-2 fs-3 mb-3">Your Rewards</button>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <button className="border border-4 border-black bg-light-green-950 w-75 py-2 fs-3">Start Minning</button>
                </div>
            </div>
            <hr className="border border-dashed border-black border-3 opacity-100 my-2"></hr>
            <span className="fs-5 fw-bolder">REWARD BALANCE:</span>
            <hr className="border border-dashed border-black border-3 opacity-100 my-2"></hr>
            <div className="row">
                <div className="col-md-4">
                    <div className="w-100 border border-light-green-950 border-3 p-4 text-center bg-green-950 rounded-2">
                        <div className="fs-2 fw-bolder text-light-green-950">42</div>
                        <div className="fs-6 text-green-300">Tweets</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="w-100 border border-light-green-950 border-3 p-4 text-center bg-green-950 rounded-2">
                        <div className="fs-2 fw-bolder text-light-green-950">189</div>
                        <div className="fs-6 text-green-300">Likes</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="w-100 border border-light-green-950 border-3 p-4 text-center bg-green-950 rounded-2">
                        <div className="fs-2 fw-bolder text-light-green-950">87</div>
                        <div className="fs-6 text-green-300">Replies</div>
                    </div>
                </div>
            </div>
            <hr className="border border-dashed border-black border-3 opacity-100 my-0"></hr>
        </div>
    )
}

export default Dashboard;