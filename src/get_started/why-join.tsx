
import { ReactComponent as IconCup } from '../svgs/cup.svg';
import { ReactComponent as IconStar } from '../svgs/star.svg';
import { ReactComponent as IconUsers } from '../svgs/users.svg';

function WhyJoinPage() {
    return (
        <div className="w-100 border border-5 border-black w-100 p-2" style={{ minHeight: "84vh", backgroundColor: '#131200' }}>
            <div className="text-uppercase fs-1 fs-lg-6 fs-xl-5 font-silkscreen-bold p-3 mb-5" style={{ lineHeight: 'normal', color: '#A9E000' }}>WHY JOIN SNAKE.AI?</div>
            <div className="row p-3 p-lg-5 d-flex justify-content-around">
                <div className="col-md-4 mb-4 d-flex justify-content-center alitn-items-center" style={{ minHeight: '250px' }}>
                    <div className='w-90'>
                        <div className='d-flex justify-content-center'>
                            <IconCup />
                        </div>
                        <div className="separator py-3 px-1"><div className="separator-5 separator-dashed separator-white"></div></div>
                        <span className="fs-4 fs-lg-9 fs-xl-10 font-silkscreen-bold" style={{ lineHeight: 'normal', color: '#A9E000' }}>Early Adoption Rewards:</span>
                        <div className="separator py-3 px-1"><div className="separator-5 separator-dashed separator-white"></div></div>
                        <span className="fs-5 fs-lg-11 fs-xl-12" style={{ lineHeight: 'normal', color: 'white' }}>Highest mining rewards for early users.</span>
                    </div>
                </div>
                <div className="col-md-4 mb-4 d-flex justify-content-center alitn-items-center" style={{ minHeight: '250px' }}>
                    <div className='w-90'>
                        <div className='d-flex justify-content-center'>
                            <IconStar />
                        </div>
                        <div className="separator py-3 px-1"><div className="separator-5 separator-dashed separator-white"></div></div>
                        <span className="fs-4 fs-lg-9 fs-xl-10 font-silkscreen-bold" style={{ lineHeight: 'normal', color: '#A9E000' }}>Scarcity and Value: </span>
                        <div className="separator py-3 px-1"><div className="separator-5 separator-dashed separator-white"></div></div>
                        <span className="fs-5 fs-lg-11 fs-xl-12" style={{ lineHeight: 'normal', color: 'white' }}>Built-in deflationary economics ensure growing scarcity.</span>
                    </div>
                </div>
                <div className="col-md-4 mb-4 d-flex justify-content-center alitn-items-center" style={{ minHeight: '250px' }}>
                    <div className='w-90'>
                        <div className='d-flex justify-content-center'>
                            <IconUsers />
                        </div>
                        <div className="separator py-3 px-1"><div className="separator-5 separator-dashed separator-white"></div></div>
                        <span className="fs-4 fs-lg-9 fs-xl-10 font-silkscreen-bold" style={{ lineHeight: 'normal', color: '#A9E000' }}>Community-owned Future: </span>
                        <div className="separator py-3 px-1"><div className="separator-5 separator-dashed separator-white"></div></div>
                        <span className="fs-5 fs-lg-11 fs-xl-12" style={{ lineHeight: 'normal', color: 'white' }}>Token holders drive decisions and future game development.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyJoinPage;
