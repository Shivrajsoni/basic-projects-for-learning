// creating a token mint
const {createMint, getOrCreateAssociatedTokenAccount, mintTo}=require('@solana/spl-token');
const {Keypair,Connection,clusterApiUrl,TOKEN_PROGRAM_ID, PublicKey}=require("@solana/web3.js");
const payer = Keypair.fromSecretKey(Uint8Array.from(["enter your private key"]));

const MintAthority=payer;

const connection=new Connection(clusterApiUrl('devnet'));

async function createMintForToken(payer,MintAthority){
    const mint = await createMint(
        connection,
        payer,
        MintAthority,
        null,
        6,
        TOKEN_PROGRAM_ID,
    );
    console.log("Mint created at ", mint.toBase58());
    return mint;
}


async function mintNewTokens(mint,to,amount){
    const tokenAccount=await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        new PublicKey(to)
    );
    console.log("TOken accpunt created at ",tokenAccount.address.toBase58());
    await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        amount
    )
    console.log("Tokens minted to ",tokenAccount.address.toBase58());
}
async function main(){
    const mint = await createMintForToken(payer,MintAthority.publicKey);
}
main();