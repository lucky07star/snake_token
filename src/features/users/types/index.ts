export type USER = {
    id: string,
    twitter_id: string,
    twitter_username: string,
    wallet_address: string | null,
    created_at: string,
    latest_claim_timestamp: string | null,
    reward_balance: number,
    likes: number,
    tweets: number,
    replies: number,
};

export type REWARDS = {
    id: string,
    user_id: string,
    twitter_id: string,
    twitter_username: string,
    tweet_id: string,
    tweet_twitter_id: string,
    message_sent: boolean,
    transaction_signature: string | null,
    wallet_address: string | null,
    media_id: string | null,
    media_id_expires_at: string | null,
    reward_amount: number,
    tx_id: string | null,
    created_at: string,
    available: boolean,
    timestamp: string | null,
    block_time: string | null,
};

export type TWEETS = {
    id: string,
    twitter_id: string,
    twitter_username: string,
    tweet_id: string,
    created_at: string,
};
