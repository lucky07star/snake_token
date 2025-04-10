
import Menu from "../partials/menu";

// Dasboard components
import Dashboard from "../partials/dashboard";
// Claim your rewards components
import ClaimRewards from "../partials/claim-rewards";
import TableMiningProgress from "../partials/mining-progress-table";

import CustomTable from "../components/custom-table";
import TableData from "../data";

interface HomeProps {
    pagename?: string
}

function Home({ pagename = 'dashboard' }: HomeProps) {
    return (
        <div className="w-100 p-3" style={{ height: "100vh" }}>
            <div className="d-flex gap-4" style={{ height: "calc(100vh-70px)", paddingTop: '70px' }}>
                {/* Menu Begin */}
                <Menu />
                {/* Menu End */}
                {(() => {
                    return <div className="item-stretch" style={{ width: 'calc(100% - 200px)' }}>
                        <div className="d-flex justify-content-between gap-4">
                            {/* Home page 1 */}
                            {pagename === 'dashboard' ? <><Dashboard /><TableMiningProgress container_height="70vh" /></> : null}

                            {/* Home page 2 */}
                            {pagename === 'claim-rewards' ? <><ClaimRewards /><TableMiningProgress container_height="70vh" table={<CustomTable height="38vh" title="Mined Tweets" data={TableData.custom_table} action_icons={['like', 'reply', 'retweet', 'delete']} />} /></> : null}
                        </div>
                        {/* Home page 2 */}
                        {pagename === 'claim-rewards' ? <div className="">
                            <hr className="border border-dashed border-black border-3 opacity-100"></hr>
                            <div className="d-flex justify-content-center align-items-center gap-5">
                                <button className="fs-4 bg-light-green-950 border border-3 border-black p-2 px-5">Claim Now!</button>
                                <button className="fs-4 bg-gray-400 border border-3 border-black p-2 px-5">Link Wallet</button>
                            </div>
                            <hr className="border border-dashed border-black border-3 opacity-100 mt-3 my-0"></hr>
                        </div> : null}
                    </div>
                })()}
            </div>
        </div>
    );
}

export default Home;
