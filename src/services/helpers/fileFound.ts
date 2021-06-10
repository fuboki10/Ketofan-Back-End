import fs, { constants } from 'fs';
import path from 'path';

function fileFound(filePath : string | undefined) : Promise<boolean> {
  if (!filePath) return new Promise((resolve) => resolve(false));

  const dirname = path.resolve();
  const fullFilePath = path.join(dirname, filePath);

  return new Promise((resolve) => {
    fs.access(fullFilePath, constants.F_OK, (err) => {
      if (err) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
}

export default fileFound;
