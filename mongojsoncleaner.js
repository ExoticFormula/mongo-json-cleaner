const fs = require("fs");
let flag = process.argv[2].trim();
let path = process.argv[3];
if (flag !== "-p" && flag !== "-P" && flag !== "--path") {
  console.log("Invalid syntax! -p flag required for file path");
  process.exit();
}

try {
  let collectionBuffer =
    fs.readFileSync(path) || fs.readFileSync(path + ".json");

  let collection = JSON.parse(collectionBuffer.toString());
  collection.forEach((document) => {
    delete document._id;
    delete document.__v;
  });

  fs.writeFileSync("cleanedjson", JSON.stringify(collection, null, 2));
} catch (e) {
  console.log("Invalid path or file");
}
