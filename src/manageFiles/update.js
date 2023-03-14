const writeFile = require('./write');
const readFile = require('./read');

const updateFile = async (path, newObject) => {
  try {
    const currentFile = await readFile(path);

    const latestId = Number(currentFile[currentFile.length - 1].id);

    const newItem = { id: latestId + 1, ...newObject };

    const newFile = [...currentFile, newItem];

    await writeFile(path, newFile);

    return newItem;
  } catch (e) {
    console.error(e);
    return e;
  }
};

module.exports = updateFile;