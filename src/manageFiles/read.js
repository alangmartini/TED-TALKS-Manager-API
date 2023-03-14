const fs = require('fs/promises');

const readFile = async (path) => {
  const info = await fs.readFile(path);

  const parsedInfos = JSON.parse(info);

  return parsedInfos;
};

module.exports = readFile;