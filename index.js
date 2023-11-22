import { Keyring } from "@polkadot/keyring";
import { stringToU8a } from "@polkadot/util";
import { mnemonicGenerate, signatureVerify } from "@polkadot/util-crypto";

const mnemonic = mnemonicGenerate();

console.log(`generating a keypair with mnemonic: "${mnemonic}"`);
const keyring = new Keyring({
  type: "ecdsa",
});
const keyringpair = keyring.addFromMnemonic(mnemonic);
console.log(`public key: ${keyring.publicKey}`);

// try signing a load of strings and verifying the signature
for (let i = 0; i < 1000; i++) {
  const message = `message ${i}`;
  console.log(`signing "${message}"`);

  const encodedMessage = stringToU8a(message);
  const signature = keyringpair.sign(encodedMessage);

  const { isValid: valid } = signatureVerify(
    encodedMessage,
    signature,
    keyringpair.publicKey
  );

  if (!valid) {
    throw Error(`signature verification failed for "${message}"`);
  }
}

console.log("all signatures verified successfully!");
