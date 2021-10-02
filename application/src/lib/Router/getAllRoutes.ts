import { readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllRoutes(
  dir: string,
  arr: string[] = [],
  rootDir = dir
): string[] {
  const result = readdirSync(dir);

  result.map((part: string) => {
    const absolutePath = join(dir, part);
    const pathStat = statSync(absolutePath);

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
