import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { ActivityCreatedListener } from './listeners/activity-created.listener';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ActivityCreatedListener],
})
export class ActivitiesModule {}
