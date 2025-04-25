
interface ProgressbarProps {
    value?: number;
    type?: string;
}

function Progressbar({ value = 0, type = 'block' }: ProgressbarProps) {
    return (
        <>
        {(() => {
            const _value = value > 100 ? 100 : (value < 0 ? 0 : value);
            if (type === 'block') {
                return <>
                    <div className="w-100 d-flex justify-content-center">
                        {(() => {
                            let divs = [];
                            for (let i = 0; i < 10; i++) {
            
                                // set rounded
                                let rounded = '';
                                if (i === 0) {
                                    rounded = 'rounded-start-4';
                                } else if (i === 9) {
                                    rounded = 'rounded-end-4'
                                }
            
                                // background-color
                                if (i * 10 < _value) {
                                    if ((i + 1) * 10 > _value) {
                                        divs.push(<div key={i} className={`border border-2 border-black ${rounded} bg-light-green-950`} style={{
                                            width: '10%',
                                            height: '45px'
                                        }}></div>);
                                    } else {
                                        const r = _value - i * 10
                                        divs.push(<div key={i} className={`border border-2 border-black ${rounded}`} style={{
                                            width: '10%',
                                            height: '45px',
                                            backgroundImage: `linear-gradient(90deg, #A9E000 ${r * 10}%, black ${100 - r * 10}%)`
                                        }}></div>);
                                    }
                                } else {
                                    divs.push(<div key={i} className={`border border-2 border-black ${rounded} bg-gray-400`} style={{
                                        width: '10%',
                                        height: '45px'
                                    }}></div>);
                                }
                            }
                            return divs;
                        })()}
                    </div>
                </>
            } else if (type === 'solid') {
                return <>
                    <div className="bg-black border-5 border-black rounded-3 d-flex justify-content-center align-items-center" style={{width: '112px', height: '44px'}}>
                        <div className="rounded-2" style={{width: '104px', height: '36px', backgroundImage: `linear-gradient(60deg, #A9E000 ${_value}%, black ${100 - _value}%)`}}></div>
                    </div>
                </>
            }
        })()}
        </>
    );
}

export default Progressbar;
