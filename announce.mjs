import { RepositoryFactoryHttp, Transaction } from "symbol-sdk";

/**
 * wait for transaction to be confirmed
 */
export const waitConfirmedTransaction = async (endpoint, fromAddress, hash) => {
  const repositoryFactory = new RepositoryFactoryHttp(endpoint);
  const listener = repositoryFactory.createListener();
  return new Promise((ok, ng) => {
    listener.open().then(() => {
      listener.newBlock();
      listener.confirmed(fromAddress, hash).subscribe({
        next: (v) => {
          console.log("Announcement approved");
          listener.close();
          ok(v);
        },
        error: (err) => {
          console.error(err);
          listener.close();
          ng(err);
        },
      });
    });
  });
};
