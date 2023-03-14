const fs = require('fs/promises');

const writeFile = async (path, object) => {
  const stringifiedObject = JSON.stringify(object, null, 2);

  await fs.writeFile(path, stringifiedObject);
};

module.exports = writeFile;