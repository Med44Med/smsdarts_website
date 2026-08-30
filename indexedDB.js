const initiateDB = () => {
  const request = indexedDB.open("smsdartsDB", 1);
  let db;
  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("keys")) {
      const objectStore = db.createObjectStore("keys", { keyPath: "id" });
    }
  };
  return request;
};

const generateKeys = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"],
  );

  const request = initiateDB();
  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["keys"], "readwrite");
    const objectStore = transaction.objectStore("keys");
    const data = {
      id: crypto.randomUUID(),
      public_key: keyPair.publicKey,
      secret_key: keyPair.secretKey,
    };
    const putRequest = objectStore.put(data);
    putRequest.onsuccess = function () {
      console.log("Keys stored successfully in IndexedDB.");
    }
  };
  return keyPair;
};


