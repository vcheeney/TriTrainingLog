import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ActivityCreatedEvent } from './events/activity-created.event';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  public activities: Activity[] = [
    {
      id: 1,
      sport: 'swim',
      distance: 3000,
      name: 'Afternoon Swim',
      note: 'Slow & steady swim, nice and easy',
      date: new Date(2022, 2, 27),
    },
    {
      id: 2,
      sport: 'bike',
      distance: 45000,
      name: 'Evening Ride',
      note: 'Hard intervals session on Zwift... tough one!',
      date: new Date(2022, 2, 27),
    },
    {
      id: 3,
      sport: 'run',
      distance: 8000,
      name: 'Morning Run',
      note: 'Gentle jog today to recover from the bike ride yesterday.',
      date: new Date(2022, 2, 28),
    },
  ];

  constructor(private eventEmitter: EventEmitter2) {}
  create(createActivityDto: CreateActivityDto) {
    const activity = {
      id: this.activities.length + 1,
      ...createActivityDto,
      date: new Date(createActivityDto.date),
    };
    this.activities.push(activity);

    const activityCreatedEvent = new ActivityCreatedEvent();
    activityCreatedEvent.sport = activity.sport;
    activityCreatedEvent.distance = activity.distance;
    activityCreatedEvent.name = activity.name;
    activityCreatedEvent.date = activity.date;
    activityCreatedEvent.note = activity.note;
    this.eventEmitter.emit('activity.created', activityCreatedEvent);

    return activity;
  }

  findAll() {
    return this.activities;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} activity`;
  // }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    const activity = this.activities.find((activity) => activity.id === id);
    if (!activity) throw new Error('Activity not found');

    const updatedActivity = {
      ...activity,
      ...updateActivityDto,
      date: new Date(updateActivityDto.date || activity.date),
    };

    this.activities = this.activities.map((activity) => {
      if (activity.id === id) {
        return updatedActivity;
      }
      return activity;
    });

    return updatedActivity;
  }

  remove(id: number) {
    const activity = this.activities.find((activity) => activity.id === id);
    if (!activity) throw new Error('Activity not found');

    this.activities = this.activities.filter((activity) => activity.id !== id);

    return { status: 200 };
  }
}
