import { Activity } from 'src/activities/entities/activity.entity';
import prisma from '../src/lib/prisma';

export async function resetDb() {
  await prisma.activity.deleteMany({});

  const testActivities: Activity[] = [
    {
      id: 'aaa',
      sport: 'swim',
      distance: 4800,
      name: 'Morning Swim',
      date: new Date('2022-03-29T06:00:00'),
      note: 'Morning swim note',
    },
    {
      id: 'bbb',
      sport: 'bike',
      distance: 60000,
      name: 'Evening Ride',
      date: new Date('2022-03-28T18:00:00'),
      note: 'Evening ride note',
    },
    {
      id: 'ccc',
      sport: 'run',
      distance: 8000,
      name: 'Morning Run',
      date: new Date('2022-03-28T06:00:00'),
    },
  ];

  await prisma.activity.createMany({
    data: testActivities,
  });
}
