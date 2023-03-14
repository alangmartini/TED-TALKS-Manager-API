const fs = require('fs/promises');

const readFile = async (path) => {
  console.log('diur is:', __dirname);

  const info = await fs.readFile(path);

  const parsedInfos = JSON.parse(info);
  console.log(parsedInfos);

  return parsedInfos;
};

module.exports = readFile;