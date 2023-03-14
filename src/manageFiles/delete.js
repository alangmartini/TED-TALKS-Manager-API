const writeFile = require('./write');
const readFile = require('./read');

const removeFromFile = async (path, id) => {
  try {
    const currentFile = await readFile(path);

    const indexToDelete = currentFile.findIndex((prop) => prop.id === Number(id));

    delete currentFile[indexToDelete];
    
    await writeFile(path, currentFile);

    return;
  } catch (e) {
    console.error(e);
    return e;
  }
};

module.exports = removeFromFile;