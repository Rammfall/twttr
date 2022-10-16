import { describe, it, expect } from "@jest/globals";

import preparedRouting from '../prepareRoutes';

describe('preparedRouting()', () => {
  describe('with empty array', () => {
    it('returns empty array', () => {
      expect(preparedRouting([])).toStrictEqual([]);
    });
  });

  describe('without dynamic routes', () => {
    it('returns correct array', () => {
      expect(
        preparedRouting(['src/check/index.ts', 'src/check/index.js'])
      ).toStrictEqual([
        {
          importPath: 'src/check/index.ts',
          params: [],
          path: 'src/check',
        },
        {
          importPath: 'src/check/index.js',
          params: [],
          path: 'src/check',
        },
      ]);
    });
  });

  describe('with dynamic routes', () => {
    it('returns correct array', () => {
      expect(
        preparedRouting(['src/[dynamic]/index.ts', 'src/check/[dynamicId].js'])
      ).toStrictEqual([
        {
          importPath: 'src/[dynamic]/index.ts',
          params: ['dynamic'],
          path: 'src/:dynamic',
        },
        {
          importPath: 'src/check/[dynamicId].js',
          params: ['dynamicId'],
          path: 'src/check/:dynamicId',
        },
      ]);
    });
  });
});
