import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import prisma from 'src/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityCreatedEvent } from './events/activity-created.event';

@Injectable()
export class ActivitiesService {
  constructor(private eventEmitter: EventEmitter2) {}

  async create(createActivityDto: CreateActivityDto) {
    const activity = {
      id: uuidv4(),
      ...createActivityDto,
      date: new Date(createActivityDto.date),
    };

    await prisma.activity.create({
      data: activity,
    });

    const activityCreatedEvent = new ActivityCreatedEvent();
    activityCreatedEvent.sport = activity.sport;
    activityCreatedEvent.distance = activity.distance;
    activityCreatedEvent.name = activity.name;
    activityCreatedEvent.date = activity.date;
    activityCreatedEvent.note = activity.note;
    this.eventEmitter.emit('activity.created', activityCreatedEvent);

    return activity;
  }

  async findAll() {
    return await prisma.activity.findMany();
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activity = await prisma.activity.findUnique({
      where: {
        id,
      },
    });
    if (!activity) throw new Error('Activity not found');

    const updatedActivity = {
      ...activity,
      ...updateActivityDto,
      date: new Date(updateActivityDto.date || activity.date),
    };

    await prisma.activity.update({
      data: updatedActivity,
      where: {
        id,
      },
    });

    return updatedActivity;
  }

  async remove(id: string) {
    const activity = await prisma.activity.findUnique({
      where: {
        id,
      },
    });
    if (!activity) throw new Error('Activity not found');

    await prisma.activity.delete({
      where: {
        id,
      },
    });

    return { status: 200 };
  }
}
