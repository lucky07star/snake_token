
import { useEffect, useState } from "react";

function RoadmapPage() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };

        // resive event
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <div className="w-100 border border-5 border-black w-100 p-3" style={{ minHeight: "84vh" }}>
            <div className="text-green-960fs-1 fs-1 fs-lg-4 fs-xl-4 font-silkscreen-bold pt-3 pb-5 px-3">ROADMAP</div>
            <div className="d-flex justify-content-center align-items-center flex-wrap pt-lg-5 mb-1">
                <div className="row">
                    <div className="col-sm-6 col-xl-3 d-flex justify-content-center x-mb-lg-5">
                        <div className="phase-container position-relative">
                            <div className="w-90 d-flex justify-content-center align-items-center position-absolute top-0 start-50 translate-middle">
                                <div className="phase-title font-silkscreen-bold">PHASE 1</div>
                            </div>
                            <div className="phase-box text-center border border-5 border-black py-2 px-3 font-silkscreen-bold text-green-960">
                                Token Creation & Tech Development
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3 d-flex justify-content-center x-mb-lg-5">
                        <div className="phase-container position-relative">
                            <div className="w-90 d-flex justify-content-center align-items-center position-absolute top-0 start-50 translate-middle">
                                <div className="phase-title font-silkscreen-bold">PHASE 2</div>
                            </div>
                            <div className="phase-box text-center border border-5 border-black py-2 px-3 font-silkscreen-bold text-green-960">
                                Simplified mining through viral activation
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3 d-flex justify-content-center x-mb-lg-5">
                        <div className="phase-container position-relative">
                            <div className="w-90 d-flex justify-content-center align-items-center position-absolute top-0 start-50 translate-middle">
                                <div className="phase-title font-silkscreen-bold">PHASE 3</div>
                            </div>
                            <div className="phase-box text-center border border-5 border-black py-2 px-3 font-silkscreen-bold text-green-960">
                                Public Launch
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-6 col-xl-3 d-flex justify-content-center ${size.width >= 576 ? 'x-mb-lg-5' : 'mb-1'}`}>
                        <div className="phase-container position-relative">
                            <div className="w-90 d-flex justify-content-center align-items-center position-absolute top-0 start-50 translate-middle">
                                <div className="phase-title font-silkscreen-bold">PHASE 4</div>
                            </div>
                            <div className="phase-box text-center border border-5 border-black py-2 px-3 font-silkscreen-bold text-green-960">
                                DAO governance & game studio
                            </div>
                        </div>
                    </div>

                    {
                        size.width >= 576 ? <>
                            <div className='col-xl-12 row justify-content-center roadmap-repeat-container'>
                                <div className="col-xl-9 m-0 p-0">
                                    <div className='position-relative w-100 border-top-0' style={{ height: '60px', border: 'dashed' }}>
                                        <div className='position-absolute top-0 start-0 translate-middle-x'><div style={{ marginLeft: '-2px' }} className='start-50 top-0 arrow-up'></div></div>
                                    </div>
                                </div>
                                <div className='col-md-12 d-flex justify-content-center position-relative' style={{ marginTop: '-2px' }}>
                                    <button className='bg-black text-light-green-950 position-absolute top-0 start-50 translate-middle fs-3 font-silkscreen-bold px-5' style={{ height: '60px' }}>Repeat</button>
                                </div>
                            </div>
                        </> : <>
                            <div className='col-xl-12'>
                                <div className="d-flex justify-content-center align-items-enter mb-2">
                                    <div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div style={{ width: '0', height: '30px', borderLeft: '4px', borderLeftStyle: 'dashed', borderLeftColor: 'black' }}></div>
                                        </div>
                                        <div className='arrow-down' style={{ marginTop: '-16px' }}></div>
                                    </div>
                                </div>
                                <div className='col-md-12 d-flex justify-content-center'>
                                    <div className='bg-black text-light-green-950 fs-3 font-silkscreen-bold px-3 py-3'>Repeat Phase 1</div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default RoadmapPage;
