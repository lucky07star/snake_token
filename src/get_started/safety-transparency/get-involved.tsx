
import { ReactComponent as IconTwitter } from '../../svgs/twitter.svg';
import { ReactComponent as IconDiscord } from '../../svgs/discord.svg';
import { ReactComponent as IconSearch } from '../../svgs/search.svg';
import { ReactComponent as IconAlarm } from '../../svgs/alarm.svg';
import { ReactComponent as IconRightLogo } from '../../svgs/logo-right.svg';

function GetInvolvedPage() {
    return (
        <div className="w-100 border border-0 w-100 p-2" style={{ minHeight: "84vh" }}>
            <div className="row px-3 pt-3 pb-0 px-lg-5 px-xl-5 pt-lg-4 pt-xl-4">
                <div className='col-md-6 align-self-center'>
                    <div className="text-uppercase text-black fs-2 fs-lg-8 fs-xl-6 fw-bolder p-3 mb-3" style={{ lineHeight: 'normal' }}>GET INVOLVED</div>
                    <button className='d-flex justify-content-start align-items-center gap-4 w-100 bg-black px-3 px-lg-5 mb-3 mb-lg-4 mb-xl-5' style={{ height: '120px' }}>
                        <IconTwitter style={{ color: '#A9E000', width: '11vh', height: '11vh' }} />
                        <span className='text-white fs-6 fs-xl-12 fs-xxl-14 text-start w-100'>FOLLOW US on twitter (x)</span>
                    </button>
                    <button className='d-flex justify-content-start align-items-center gap-4 w-100 bg-black px-3 px-lg-5 mb-3 mb-lg-4 mb-xl-5' style={{ height: '120px' }}>
                        <IconDiscord style={{ color: '#A9E000', width: '11vh', height: '11vh' }} />
                        <span className='text-white fs-6 fs-xl-12 fs-xxl-14 text-start w-100'>Join our community on discord</span>
                    </button>
                    <button className='d-flex justify-content-start align-items-center gap-4 w-100 bg-black px-3 px-lg-5' style={{ height: '120px' }}>
                        <IconSearch style={{ color: '#A9E000', width: '12vh', height: '12vh' }} />
                        <span className='text-white fs-6 fs-xl-12 fs-xxl-14 text-start w-100'>read our litepaper</span>
                    </button>
                </div>
                <div className='col-md-6 align-self-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <IconAlarm className='icon-alarm' />
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <IconRightLogo className='icon-right-logo' />
                    </div>
                </div>
            </div>
            <hr className="border border-black border-3 opacity-100"></hr>
            <div className="text-uppercase text-black fs-5 fs-lg-10 fs-xl-10 fw-bolder text-center" style={{ lineHeight: 'normal' }}>#MineTheSnake and Join the Revolution</div>
        </div>
    );
}

export default GetInvolvedPage;
