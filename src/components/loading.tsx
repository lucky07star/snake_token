
import { ReactComponent as IconDotLoading } from "../svgs/dot-loading.svg";
import { ReactComponent as IconLineLoading } from "../svgs/line-loading.svg";

interface LoadingProps {
    icon?: string,
    top_text?: boolean,
}

function Loading({ icon = 'dot-circle', top_text = true }: LoadingProps) {
    return (
        <div className="w-100 p-4" style={{ height: '100vh' }}>
            <div className="w-100 border-3 border-bottom border-bottom-dashed border-black mb-3 mb-lg-4" style={{ height: '7vh' }}></div>
            <div className="d-flex justify-content-center align-items-center border-5 border-dashed border-black" style={{ height: '84vh' }}>
                <div className="text-center">
                    {top_text === true ? <div className="fs-1 fs-lg-4 mb-2">Loading</div> : ''}
                    {
                        (() => {
                            if (icon === 'dot-circle') {
                                return <IconDotLoading className="rotate" />
                            } else if (icon === 'line-circle') {
                                return <IconLineLoading className="rotate" />
                            } else if (icon === 'progressbar') {
                                return <>
                                    <div className="border border-3 border-black p-1 progressbar">
                                        <div className="progressbar-item-delay-m4 bg-black"></div>
                                        <div className="progressbar-item-delay-m2 bg-black"></div>
                                        <div className="progressbar-item bg-black"></div>
                                    </div>
                                </>
                            }
                        })()
                    }
                    {top_text === false ? <div className="fs-1 fs-lg-4 mb-2">Loading</div> : ''}
                </div>
            </div>
        </div >
    );
}

export default Loading;
