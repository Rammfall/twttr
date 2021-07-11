import fs from 'fs';
import { join } from 'path';

function getAllRoutes(
  dir: string,
  arr: string[] = [],
  rootDir = dir
): string[] {
  const result = fs.readdirSync(dir);

  result.map((part: string) => {
    const absolutePath = join(dir, part);
    const pathStat = fs.statSync(absolutePath);

    if (pathStat.isDirectory()) {
      getAllRoutes(absolutePath, arr, rootDir);
      return;
    }

    const str = absolutePath.replace('src/', '');

    arr.push(str);
  });

  return arr;
}

export default getAllRoutes;
