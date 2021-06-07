import fs, { constants } from 'fs';
import path from 'path';

function deleteFileIfFound(filePath : string | undefined) {
  if (!filePath) return;

  const dirname = path.resolve();
  const fullFilePath = path.join(dirname, filePath);

  fs.access(fullFilePath, constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(fullFilePath, () => null);
    }
  });
}

export default deleteFileIfFound;
