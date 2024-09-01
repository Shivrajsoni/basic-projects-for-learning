import { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));

async function airdrop(publicKey, amount) {
    const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
    await connection.confirmTransaction({signature: airdropSignature})
}

airdrop("32D1NwcrEgfGKyeHxQspCeNB6ogaG4Ltge8qUyJcQf7y", 10).then(signature => {
    console.log('Airdrop signature:', signature);
});



