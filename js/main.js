const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const process = require("process");


const account_name = process.env.ACCOUNT_NAME;
const account_key = process.env.ACCOUNT_KEY;

console.log(account_name);
console.log(account_key);

const key_credential = new StorageSharedKeyCredential(account_name, account_key);

const blob_client = new BlobServiceClient(
  `https://${account_name}.blob.core.windows.net`,
  key_credential
);


async function container_inventory(){
    let containers = blob_client.listContainers();
    for await (const c of containers) {
      console.log(c.name);
      const container_client = blob_client.getContainerClient(c.name);
      let blobs = container_client.listBlobsFlat(c.name);
      for await (const b of blobs){
        console.log(`-> ${b.name}`)
      }
    }
  }

// start our function
container_inventory()