import mongoose from 'mongoose';

export const connectDB = async () => {
	await mongoose.connect('mongodb+srv://great:great521@cluster0.ugofsmz.mongodb.net/todo-app');
	console.log('DB Connected');
};
