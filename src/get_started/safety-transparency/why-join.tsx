
import { ReactComponent as IconCup } from '../../svgs/cup.svg';
import { ReactComponent as IconStar } from '../../svgs/star.svg';
import { ReactComponent as IconUsers } from '../../svgs/users.svg';

function WhyJoinPage() {
    return (
        <div className="w-100 border border-5 border-black w-100 p-2" style={{ minHeight: "84vh", backgroundColor: '#131200' }}>
            <div className="text-uppercase fs-1 fs-lg-6 fs-xl-4 fw-bolder p-3 mb-5" style={{ lineHeight: 'normal', color: '#A9E000' }}>WHY JOIN SNAKE.AI?</div>
            <div className="row p-3">
                <div className="col-md-4 mb-5">
                    <div className='d-flex justify-content-center'>
                        <IconCup className='' style={{ color: '#A9E000' }} />
                    </div>
                    <div className="px-1 py-1">
                        <hr className="border border-dashed border-white border-1"></hr>
                    </div>
                    <span className="fs-4 fs-lg-9 fs-xl-9 fw-bolder" style={{ lineHeight: 'normal', color: '#A9E000' }}>Early Adoption Rewards:</span>
                    <div className="px-1 py-1">
                        <hr className="border border-dashed border-white border-1"></hr>
                    </div>
                    <span className="fs-5 fs-lg-12 fs-xl-12" style={{ lineHeight: 'normal', color: 'white' }}>Highest mining rewards for early users.</span>
                </div>
                <div className="col-md-4 mb-5">
                    <div className='d-flex justify-content-center'>
                        <IconStar className='' style={{ color: '#A9E000' }} />
                    </div>
                    <div className="px-1 py-1">
                        <hr className="border border-dashed border-white border-1"></hr>
                    </div>
                    <span className="fs-4 fs-lg-9 fs-xl-9 fw-bolder" style={{ lineHeight: 'normal', color: '#A9E000' }}>Scarcity and Value: </span>
                    <div className="px-1 py-1">
                        <hr className="border border-dashed border-white border-1"></hr>
                    </div>
                    <span className="fs-5 fs-lg-12 fs-xl-12" style={{ lineHeight: 'normal', color: 'white' }}>Built-in deflationary economics ensure growing scarcity.</span>
                </div>
                <div className="col-md-4 mb-5">
                    <div className='d-flex justify-content-center'>
                        <IconUsers className='' style={{ color: '#A9E000' }} />
                    </div>
                    <div className="px-1 py-1">
                        <hr className="border border-dashed border-white border-1"></hr>
                    </div>
                    <span className="fs-4 fs-lg-9 fs-xl-9 fw-bolder" style={{ lineHeight: 'normal', color: '#A9E000' }}>Community-owned Future: </span>
                    <div className="px-1 py-1">
                        <hr className="border border-dashed border-white border-1"></hr>
                    </div>
                    <span className="fs-5 fs-lg-12 fs-xl-12" style={{ lineHeight: 'normal', color: 'white' }}>Token holders drive decisions and future game development.</span>
                </div>
            </div>
        </div>
    );
}

export default WhyJoinPage;
