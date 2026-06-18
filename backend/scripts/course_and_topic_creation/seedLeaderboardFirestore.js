const { db } = require('../config/firebase');
const { collection, getDocs, deleteDoc, addDoc, doc, setDoc } = require('firebase/firestore');
const User = require('../models/User');

const seedUsers = [
    {
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alice@example.com',
        username: 'alicew',
        password: 'password123',
        totalPoints: 1250,
        problemsSolved: 45,
        averageAccuracy: 92.5,
        currentStreak: 5,
        role: 'student',
        photoUrl: ''
    },
    {
        firstName: 'Bob',
        lastName: 'Builder',
        email: 'bob@example.com',
        username: 'bobbuilds',
        password: 'password123',
        totalPoints: 980,
        problemsSolved: 30,
        averageAccuracy: 88.0,
        currentStreak: 3,
        role: 'student',
        photoUrl: ''
    },
    {
        firstName: 'Charlie',
        lastName: 'Code',
        email: 'charlie@example.com',
        username: 'charliec',
        password: 'password123',
        totalPoints: 1500,
        problemsSolved: 60,
        averageAccuracy: 95.5,
        currentStreak: 12,
        role: 'student',
        photoUrl: ''
    },
    {
        firstName: 'Diana',
        lastName: 'Dev',
        email: 'diana@example.com',
        username: 'dianadev',
        password: 'password123',
        totalPoints: 800,
        problemsSolved: 25,
        averageAccuracy: 85.0,
        currentStreak: 2,
        role: 'student',
        photoUrl: ''
    },
    {
        firstName: 'Ethan',
        lastName: 'Eng',
        email: 'ethan@example.com',
        username: 'ethan_eng',
        password: 'password123',
        totalPoints: 2100,
        problemsSolved: 85,
        averageAccuracy: 98.0,
        currentStreak: 20,
        role: 'student',
        photoUrl: ''
    }
];

const seedLeaderboard = async () => {
    try {
        console.log('Seeding Firestore Leaderboard...');

        // 1. Delete existing seed users (by email) to prevent duplicates
        // Note: Firestore doesn't have "deleteMany" easily accessible without query
        // We will fetch users by email and delete them.
        const usersRef = collection(db, 'users');

        for (const seedUser of seedUsers) {
            const user = await User.findOne({ email: seedUser.email });
            if (user && user.id) {
                console.log(`Deleting existing user: ${seedUser.email}`);
                await deleteDoc(doc(db, 'users', user.id));
            }
        }

        // 2. Add new users
        console.log('Adding new users...');
        for (const seedUser of seedUsers) {
            const newUser = new User(seedUser);
            await newUser.save();
            console.log(`Added user: ${seedUser.username}`);
        }

        console.log('✅ Seed completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding leaderboard:', error);
        process.exit(1);
    }
};

seedLeaderboard();
