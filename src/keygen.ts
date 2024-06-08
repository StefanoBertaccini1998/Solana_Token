import { Keypair } from "@solana/web3.js";

// Create a new Keypair
const keypair = Keypair.generate();

// Now we will log the public key and the private key
console.log(`Hai generato il tuo nuovo wallet: ${keypair.publicKey.toBase58()} \n\n Per salvare il tuo wallet, copia e incolla il seguente JSON in un file: [${keypair.secretKey}]`)

new File([keypair.secretKey], "../properties/privateKey.json",)