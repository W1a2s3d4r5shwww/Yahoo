import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' });

export const logger = {
  stream: {
    write: (message) => logStream.write(message)
  }
};
