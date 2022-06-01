import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VcGateway } from './vc.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VcGateway],
})
export class AppModule {}
