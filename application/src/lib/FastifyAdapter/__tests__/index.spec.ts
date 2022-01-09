import Fastify from 'fastify';

import FastifyAdapter from '../index';

jest.mock('fastify');

describe('FastifyAdapter', () => {
  describe('initialize', () => {
    const application = new FastifyAdapter({
      routes: [{ path: '/check', importPath: './__mocks__', params: [] }],
    });

    // jest.spyOn(Fastify, )

    it('adds all modules', () => {
      expect(Fastify).toBeCalledWith({
        logger: true,
      });
    });
  });
});
