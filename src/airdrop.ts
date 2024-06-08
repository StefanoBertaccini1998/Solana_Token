import {
    Keypair,
    Connection,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";

// Import the private key from properties. This file must be not empty and it need to contains a correct UintArray
import wallet from "../properties/privateKey.json";

// Create a keypair form the secret key get early
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a new connection to Solana devnet
const connection = new Connection("https://api.devnet.solana.com", "finalized");


// Awaiting for transaction to complete
(async () => {
    try {

        // Ask for 5 Solana in to wallet associated
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      // Wallet previously get
            5 * LAMPORTS_PER_SOL    // Sol Amount
        );

        // Await for Solana and log the transaction in Solana Explorer
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();
