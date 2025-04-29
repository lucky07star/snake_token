// fetchRewardPool.ts
import { Connection, PublicKey, clusterApiUrl  } from '@solana/web3.js';
import { RewardPool } from '../types/pool';
import { Buffer } from 'buffer';

const PROGRAM_ID = new PublicKey('Aw4zQtbMuxCChXS923HeyhAMPakC8KMQa6tQmMS4pPYM');
const REWARD_POOL_SEED = Buffer.from('reward_pool_v2');

// const connection = new Connection(process.env.NETWORK as string, 'confirmed');
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export async function fetchRewardPoolData(): Promise<any> {
    try {
        const rewardPoolAddress = await getRewardPoolAddress();
        const accountInfo = await connection.getAccountInfo(rewardPoolAddress);

        if (accountInfo === null) {
            throw new Error('RewardPool account not found');
        }

        // Ensure the buffer has enough data before decoding
        if (accountInfo.data.length < 160) { // Adjust based on your expected length
            throw new Error('Buffer length is insufficient for decoding RewardPool');
        }

        // Decode the account data
        const rewardPoolData = decodeRewardPool(accountInfo.data.slice(8));

        return rewardPoolData;
    } catch (error) {
        console.error('Error fetching reward pool data:', error);
        return null;
    }
}

function decodeRewardPool(data: any): RewardPool {
    const owner = new PublicKey(data.slice(0, 32));
    const admin = new PublicKey(data.slice(32, 64));
    const mint = new PublicKey(data.slice(64, 96));
    const treasury = new PublicKey(data.slice(96, 128));
    const tweetNumber = data.readUInt32LE(128);
    const mintedAccum = data.readUInt32LE(136);
    const burned = data.readUInt32LE(144);
    const airdropped = data.readUInt32LE(152);

    return {
        owner,
        admin,
        mint,
        treasury,
        tweetNumber,
        mintedAccum,
        burned,
        airdropped,
    };
}

async function getRewardPoolAddress() {
    const [rewardPoolAddress] = await PublicKey.findProgramAddress(
        [REWARD_POOL_SEED],
        PROGRAM_ID
    );
    return rewardPoolAddress;
}
