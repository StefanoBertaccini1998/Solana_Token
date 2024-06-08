import {
    Keypair,
    Connection,
    PublicKey,
} from "@solana/web3.js";

import {
    mintTo,
    getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

import wallet from "../properties/privateKey.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("9CuiRpWARKaHV6uZctieKD7VpRAo3EZDxMnv7HvpH4Vd");

(async () => {
    //Get token account associated to Wallet passed and mint public key passed
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey,
    );

    const ata = tokenAccount.address;
    console.log("Associated Token Account: ", ata.toBase58());

    const amount = 10e6;

    //Mint token amount
    await mintTo(
        connection,
        keypair,
        mint,
        ata,
        keypair.publicKey,
        amount
    );

    console.log("Minted", amount, "to", ata.toBase58());

})()