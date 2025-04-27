
interface ProgressbarProps {
    value?: number;
    type?: string;
    barColor?: string;
    bgColor?: string; /* for block style progress bar, bg color will be #ced4da, for solid style: bg color will be black */
    borderColor?: string;
    size?: string; /* is only for solid progress bar : value --> normal, small */
}

function Progressbar({ value = 0, type = 'block', barColor = '#A9E000', bgColor = 'black', borderColor = 'black', size = "normal" }: ProgressbarProps) {
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
                                        if ((i + 1) * 10 < _value) {
                                            divs.push(<div key={i} className={`border border-2 border-black ${rounded}`} style={{
                                                width: '10%',
                                                height: '45px',
                                                backgroundColor: `${barColor}`
                                            }}></div>);
                                        } else {
                                            const r = _value - i * 10
                                            console.log(r)
                                            divs.push(<div key={i} className={`border border-2 border-black ${rounded}`} style={{
                                                width: '10%',
                                                height: '45px',
                                                backgroundImage: `linear-gradient(90deg, ${barColor} ${r * 10}%, ${bgColor} ${r * 10}%)`
                                            }}></div>);
                                        }
                                    } else {
                                        divs.push(<div key={i} className={`border border-2 border-black ${rounded}`} style={{
                                            width: '10%',
                                            height: '45px',
                                            backgroundColor: `${bgColor}`
                                        }}></div>);
                                    }
                                }
                                return divs;
                            })()}
                        </div>
                    </>
                } else if (type === 'solid') {
                    return <>
                        <div className="rounded-3 border-5 d-flex justify-content-center align-items-center" style={{ width: `${size === "normal" ? '112px' : '54px'}`, height: `${size === "normal" ? '44px' : '28px'}`, borderColor: `${borderColor}`, backgroundColor: `${borderColor}` }}>
                            {
                                _value === 0 ? <div className="rounded-2" style={{ width: `${size === 'normal' ? '106px' : '50px'}`, height: `${size === 'normal' ? '36px' : '24px'}`, backgroundColor: 'black' }}></div> : <div className="rounded-2" style={{ width: `${size === 'normal' ? '106px' : '50px'}`, height: `${size === 'normal' ? '36px' : '24px'}`, backgroundImage: `linear-gradient(60deg, ${barColor} ${_value}%, ${bgColor} ${_value}%)` }}></div>
                            }
                        </div>
                    </>
                }
            })()}
        </>
    );
}

export default Progressbar;
