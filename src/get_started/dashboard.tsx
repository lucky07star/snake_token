
import { ReactComponent as IconLeftLogo } from "../svgs/logo-left.svg";

function DashboardPage() {
    return (
        <div className="border border-5 border-black p-3 d-flex justify-content-center align-items-center" style={{ minHeight: "84vh" }}>
            <div className="w-100">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 mb-4 w-100 mb-2">
                    <IconLeftLogo className="fs-1 fs-lg-1 fs-xl-1" />
                    <span className="fs-1 fs-lg-1 fs-xl-1 fw-bold">SNAKE.AI</span>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mb-2">
                    <p className="fs-6 fs-lg-8 fs-xl-8 fw-bold text-center w-75">Meme-powered. Nostalgia-driven. Deflationary.</p>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mb-2">
                    <p className="fs-6 fs-lg-8 fs-xl-8 text-center w-75">Welcome to the future of crypto engagement—where meme culture meets blockchain innovation.</p>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
