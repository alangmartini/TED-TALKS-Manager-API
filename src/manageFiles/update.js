const writeFile = require('./write');
const readFile = require('./read');

const addToFile = async (path, newObject) => {
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

const updateFile = async (path, newObject, id) => {
  try {
    const currentFile = await readFile(path);

    const indexToUpdate = currentFile.findIndex((prop) => prop.id === Number(id));
    if (indexToUpdate === -1) {
      return false;
    }

    currentFile[indexToUpdate] = { ...newObject, id: Number(id) };
    
    await writeFile(path, currentFile);

    return currentFile[indexToUpdate];
  } catch (e) {
    console.error(e);
    return e;
  }
};

const updateRateOnFile = async (path, newRate, id) => {
  try {
    const currentFile = await readFile(path);

    const indexToUpdate = currentFile.findIndex((prop) => prop.id === Number(id));

    if (indexToUpdate === -1) {
      return false;
    }

    currentFile[indexToUpdate].talk.rate = newRate;
    
    await writeFile(path, currentFile);

    return currentFile[indexToUpdate];
  } catch (e) {
    return { type: 'ERROR_ON_WRITE_OR_READ', message: e};
  }
};

module.exports = {
  addToFile,
  updateFile,
  updateRateOnFile,
};