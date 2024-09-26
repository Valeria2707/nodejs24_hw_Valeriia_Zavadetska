import { LogIpMiddleware } from './logIp.middleware';

describe('LogIpMiddleware', () => {
  it('should be defined', () => {
    expect(new LogIpMiddleware()).toBeDefined();
  });
});
