import {
    Keypair,
    Connection,
    PublicKey,
} from "@solana/web3.js";

import {
    getOrCreateAssociatedTokenAccount,
    transfer,
} from "@solana/spl-token";

import wallet from "../properties/privateKey.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("9CuiRpWARKaHV6uZctieKD7VpRAo3EZDxMnv7HvpH4Vd");
const fromAta = new PublicKey("9RfWDL8niKYkbKc7W8Lff6q3DXW8CM6FkfrVHvt6o6RU");

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {

    //Get token account associated to Wallet passed and mint public key passed
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        to.publicKey,
    );

    //Token address
    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    //Token supply
    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    const amount = 10e5;

    //Transfer previous amount to old wallet created
    await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair,
        amount
    );

    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
})()