import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [EventEmitterModule.forRoot(), ActivitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
