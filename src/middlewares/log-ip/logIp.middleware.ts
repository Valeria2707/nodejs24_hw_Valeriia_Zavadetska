import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogIpMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.socket.remoteAddress);
    next();
  }
}
