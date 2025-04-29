// types.ts
import { PublicKey } from '@solana/web3.js';

export interface RewardPool {
    owner: PublicKey;
    admin: PublicKey;
    mint: PublicKey;
    treasury: PublicKey;
    tweetNumber: number;
    mintedAccum: number;
    burned: number;
    airdropped: number;
}
