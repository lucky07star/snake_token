
import { ReactComponent as IconTwitter } from '../svgs/twitter.svg';
import { ReactComponent as IconDiscord } from '../svgs/discord.svg';
import { ReactComponent as IconSearch } from '../svgs/search.svg';
import { ReactComponent as IconAlarm } from '../svgs/alarm.svg';
import { ReactComponent as IconRightLogo } from '../svgs/logo-right.svg';

function GetInvolvedPage() {
    return (
        <div className="w-100 border border-0 w-100 p-2" style={{ minHeight: "84vh" }}>
            <div className="row px-3 pt-5 pb-0 px-lg-5 px-xl-5 pt-lg-4 pt-xl-4">
                <div className='col-md-6 d-flex justify-content-center align-items-center flex-wrap mb-4'>
                    <div className="fs-2 fs-lg-8 fs-xl-6 font-silkscreen-bold p-3 mb-3 text-green-960" style={{ lineHeight: 'normal' }}>GET INVOLVED</div>
                    <button className='d-flex justify-content-start align-items-center gap-4 w-75 bg-black px-3 px-lg-5 mb-3 mb-lg-4 mb-xl-5' style={{ minHeight: '80px' }}>
                        <IconTwitter style={{ width: '5vh' }} />
                        <span className='text-white fs-6 fs-xl-12 fs-xxl-14 text-start w-100 py-2' style={{ lineHeight: 'normal' }}>FOLLOW US on twitter (x)</span>
                    </button>
                    <button className='d-flex justify-content-start align-items-center gap-4 w-75 bg-black px-3 px-lg-5 mb-3 mb-lg-4 mb-xl-5' style={{ minHeight: '80px' }}>
                        <IconDiscord style={{ width: '5vh' }} />
                        <span className='text-white fs-6 fs-xl-12 fs-xxl-14 text-start w-100' style={{ lineHeight: 'normal' }}>Join our community on discord</span>
                    </button>
                    <button className='d-flex justify-content-start align-items-center gap-4 w-75 bg-black px-3 px-lg-5' style={{ minHeight: '80px' }}>
                        <IconSearch style={{ width: '5vh' }} />
                        <span className='text-white fs-6 fs-xl-12 fs-xxl-14 text-start w-100' style={{ lineHeight: 'normal' }}>read our litepaper</span>
                    </button>
                </div>
                <div className='col-md-6 align-self-end'>
                    <div className='d-flex justify-content-center align-items-center mb-4'>
                        <IconAlarm className='icon-alarm' style={{ width: '32vh', height: 'auto' }} />
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <IconRightLogo className='icon-right-logo' style={{ width: '32vh', height: 'auto' }} />
                    </div>
                </div>
            </div>
            <hr className="border border-black border-3 opacity-100 my-4"></hr>
            <div className="fs-5 fs-lg-10 fs-xl-10 text-center text-green-960" style={{ lineHeight: 'normal' }}>#MineTheSnake and Join the Revolution</div>
        </div>
    );
}

export default GetInvolvedPage;
