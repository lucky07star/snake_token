
import { ReactComponent as IconLeftLogo } from "../svgs/logo-left.svg";

function NotFoundPage() {
    return (
        <div className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="w-100">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 mb-2">
                    <IconLeftLogo style={{ width: '30vh', height: 'auto' }} />
                    <span className="fs-1 fs-lg-1 fs-xl-1 fs-xxl-2 fw-bold">404!</span>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mb-2">
                    <p className="fs-2 fs-lg-3 fs-xl-5 fs-xxl-7 fw-bolder text-center" style={{ lineHeight: 'normal' }}>Page Not Found</p>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
