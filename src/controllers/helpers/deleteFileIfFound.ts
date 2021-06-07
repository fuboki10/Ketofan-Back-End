import fs, { constants } from 'fs';
import { Express } from 'express';
import path from 'path';

function deleteFileIfFound(file : Express.Multer.File | undefined) {
  if (!file) return;

  const dirname = path.resolve();
  const filePath = path.join(dirname, file.path);

  fs.access(filePath, constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(filePath, () => null);
    }
  });
}

export default deleteFileIfFound;
