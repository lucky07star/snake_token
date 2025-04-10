
import Menu from "../partials/menu";
import TableMiningProgress from "../partials/mining-progress-table";
import MineTweets from "../partials/mine-tweets";

import CustomTable from "../components/custom-table";

import TableData from '../data'

interface TweetMiningPageProps {
    page_number?: number
}

function TweetMiningPage({ page_number = 1 }: TweetMiningPageProps) {
    return (
        <div className="w-100 p-3" style={{ height: "100vh" }}>
            <div className="d-flex gap-4" style={{ height: "calc(100vh-70px)", paddingTop: '70px' }}>
                {/* Menu Begin */}
                <Menu />
                {/* Menu End */}
                <div className="item-stretch" style={{ width: 'calc(100% - 160px)' }}>
                    <div className="w-100 d-flex justify-content-between gap-4">
                        <MineTweets state={page_number} />
                        <TableMiningProgress container_height="86vh" table={<CustomTable height="54vh" title="Mined Tweets" data={TableData.custom_table} action_icons={['retweet', 'delete']} />} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TweetMiningPage;
