import { TransactionHttp, NetworkType, Address } from "symbol-sdk";
import { waitConfirmedTransaction } from "./announce.mjs";
import { SymbolHtlc } from "@atomicport/symbol";

const node = "http://samdal-1.dusanjp.com:3000";
const generationHashSeed = "2C922AF117618EC9CBA13D64243456305C9C0BABD6ED492F2979B7017F6102AB";
const epochAdjustment = 1706705527;
const currencyMosaicId = "694128D7C402A03C";
const ACCOUNT = {
  alice: {
    address: "NDZVWPFIJW3SJOKI46TLFWVQMXRP2TKRCON2HJQ",
    privateKey: "327FF13859404A31B6D5192522CD83838A60CDB5271DBC2D5C74B438A62188A1",
    publicKey: "1B221DC58C16CF6E928A37EAA49C107041F8D62FDC3942F7FA2B261BDAE6A7CE",
  },
  bob: {
    address: "NAQCGOWNDOEQWA5YPVKGJNZPT2QE7RXDTXQ6SWI",
    privateKey: "848C9F42198C947A5730E752E136DC6D3310A6B65006725618F2654A26CEB12D",
    publicKey: "90E1D2A533D6715235CB49CFBD69EE0A69B8F89C8FD74C02546E5A9E54498F80",
  },
};

const client = new SymbolHtlc(node, NetworkType.MAIN_NET, generationHashSeed, epochAdjustment);
// const hashPair = {
//   secret: "590904E8BD086A3B733855267EF780E378CE15596941F69F8EFB68C7EB6DD1DB",
//   proof: "DD284B69B2EE39CEAABF496F1A3C3C626DF585371F6F2DE51FDCABB771C8FA93",
// };
const hashPair = client.createHashPair();
const transaction = client.lock(ACCOUNT.alice.address, currencyMosaicId, hashPair.secret, 1);
const signed = await client.sign(ACCOUNT.bob.privateKey, transaction);

new TransactionHttp(node).announce(signed).subscribe((e) => console.log(e));

waitConfirmedTransaction(node, Address.createFromRawAddress(ACCOUNT.bob.address), signed.hash).then((e) =>
  console.log(`result ${e}`)
);
