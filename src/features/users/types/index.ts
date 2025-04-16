export type USER = {
    id: string,
    twitter_id: string,
    twitter_username: string,
    wallet_address: string | null,
    created_at: string,
    latest_claim_timestamp: string | null,
};

export type REWARDS = {
    id: string,
    user_id: string,
    reward_amount: number,
    tx_id: string | null,
    created_at: string,
    available: boolean,
    timestamp: string | null,
    block_time: string | null,
};
