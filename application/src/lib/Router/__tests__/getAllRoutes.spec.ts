import { describe, it, expect } from '@jest/globals';

import getAllRoutes from '../getAllRoutes';

describe('getAllRoutes', () => {
  describe('if folder does not exist', () => {
    it('throw error', () => {
      const temp = () => {
        getAllRoutes('check');
      };
      expect(temp).toThrowError();
    });
  });

  describe('if folder has no files', () => {
    it('returns empty array', () => {
      expect(
        getAllRoutes('src/lib/Router/__mocks__/emptyFolder'),
      ).toStrictEqual(['lib/Router/__mocks__/emptyFolder/.keep']);
    });
  });

  describe('folder with files', () => {
    it('returns array with paths', () => {
      expect(getAllRoutes('src/lib/Router/__mocks__/withFiles')).toStrictEqual([
        'lib/Router/__mocks__/withFiles/files/first/all.ts',
        'lib/Router/__mocks__/withFiles/files/first/last.ts',
      ]);
    });
  });
});
