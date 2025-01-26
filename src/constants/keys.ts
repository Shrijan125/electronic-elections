import keys from './pallierkeys.json';
import { PublicKey, PrivateKey } from 'paillier-bigint';
const publicKey = new PublicKey(BigInt(keys.publicKey.n), BigInt(keys.publicKey.g));
const privateKey = new PrivateKey(BigInt(keys.privateKey.lambda), BigInt(keys.privateKey.mu), publicKey);

export { publicKey, privateKey };
