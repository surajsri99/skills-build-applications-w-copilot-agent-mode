import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Rivera',
        fitnessLevel: 'intermediate',
      },
      {
        username: 'jamie.moves',
        email: 'jamie.moves@example.com',
        displayName: 'Jamie Chen',
        fitnessLevel: 'beginner',
      },
      {
        username: 'taylor.trains',
        email: 'taylor.trains@example.com',
        displayName: 'Taylor Morgan',
        fitnessLevel: 'advanced',
      },
    ]);

    await Team.create([
      {
        name: 'Morning Momentum',
        description: 'A friendly team for consistent early workouts.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Peak Performers',
        description: 'Training together for the monthly challenge.',
        members: [users[2]._id],
      },
    ]);

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 32,
        distanceKm: 5.2,
        points: 52,
      },
      {
        user: users[1]._id,
        type: 'walking',
        durationMinutes: 28,
        distanceKm: 2.4,
        points: 24,
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 45,
        points: 60,
      },
    ]);

    await Workout.create([
      {
        title: 'Steady 5K Builder',
        description: 'A relaxed run with a short cooldown to build endurance.',
        activityType: 'running',
        difficulty: 'intermediate',
        durationMinutes: 35,
      },
      {
        title: 'Walk and Reset',
        description: 'An accessible brisk walk focused on consistent movement.',
        activityType: 'walking',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
      {
        title: 'Full Body Circuit',
        description: 'A challenging strength circuit using bodyweight movements.',
        activityType: 'strength',
        difficulty: 'advanced',
        durationMinutes: 45,
      },
    ]);

    await Leaderboard.create(
      activities.map((activity: { user: mongoose.Types.ObjectId; points: number }) => ({
        user: activity.user,
        points: activity.points,
        period: 'all-time',
      })),
    );

    console.log(`Database seeding complete: ${users.length} users, ${activities.length} activities.`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
