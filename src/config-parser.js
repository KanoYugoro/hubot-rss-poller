import fs from 'fs-promise';

export async function loadFile(fileLocation) {
  return await fs.readFile(fileLocation, { encoding: 'utf8' });
}

// export function readConfigFile(fileContents);
