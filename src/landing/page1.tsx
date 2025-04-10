
import Snake from "../snake";

function FirstPage() {
    return (
        <div className="w-100 border border-5 border-black w-100 p-3" style={{ height: "82vh" }}>
            <Snake node_count={20} />
        </div>
    );
}

export default FirstPage;
