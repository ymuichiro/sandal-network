import { Account, NetworkType } from "symbol-sdk";

const accountA = Account.generateNewAccount(NetworkType.MAIN_NET);
const accountB = Account.generateNewAccount(NetworkType.MAIN_NET);

console.log({
  address: accountA.address.plain(),
  privateKey: accountA.privateKey,
  publicKey: accountA.publicKey,
});
console.log({
  address: accountB.address.plain(),
  privateKey: accountB.privateKey,
  publicKey: accountB.publicKey,
});

// address: 'NDZVWPFIJW3SJOKI46TLFWVQMXRP2TKRCON2HJQ',
// privateKey: '327FF13859404A31B6D5192522CD83838A60CDB5271DBC2D5C74B438A62188A1',
// publicKey: '1B221DC58C16CF6E928A37EAA49C107041F8D62FDC3942F7FA2B261BDAE6A7CE'
// address: 'NAQCGOWNDOEQWA5YPVKGJNZPT2QE7RXDTXQ6SWI',
// privateKey: '848C9F42198C947A5730E752E136DC6D3310A6B65006725618F2654A26CEB12D',
// publicKey: '90E1D2A533D6715235CB49CFBD69EE0A69B8F89C8FD74C02546E5A9E54498F80'
