import {
    Keypair,
    Connection,
} from "@solana/web3.js";

import { createMint } from "@solana/spl-token";

import wallet from "../properties/privateKey.json";
//Get keypair from wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
//Get connection for Solana Devent
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    //create mint
    const mint = await createMint(
        connection,
        keypair,
        keypair.publicKey,
        null,
        9,
    );

    console.log("Mint Address:", mint.toBase58());
})()