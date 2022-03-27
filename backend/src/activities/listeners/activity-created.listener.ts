import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ActivityCreatedEvent } from '../events/activity-created.event';

@Injectable()
export class ActivityCreatedListener {
  @OnEvent('activity.created')
  handleActivityCreatedEvent(event: ActivityCreatedEvent) {
    console.log(event);
  }
}
