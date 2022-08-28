import { readdirSync, statSync } from 'fs';
import { type } from 'os';
import { join } from 'path';

function getAllRoutes(
  dir: string,
  arr: string[] = [],
  rootDir = dir
): string[] {
  const result = readdirSync(dir);

  // TODO: refactor to reduce
  result.forEach((part: string) => {
    const absolutePath = join(dir, part);
    const pathStat = statSync(absolutePath);

    if (pathStat.isDirectory()) {
      getAllRoutes(absolutePath, arr, rootDir);
      return;
    }

    const str = absolutePath.replace(
      `src${type() === 'Windows_NT' ? '\\' : '/'}`,
      ''
    );

    arr.push(str.replaceAll('\\', '/'));
  });

  return arr;
}

export default getAllRoutes;
