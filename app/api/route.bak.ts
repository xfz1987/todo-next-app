import { connectDB } from '@/lib/config/db';
import TodoModel from '@/lib/models/TodoModel';
import { NextRequest, NextResponse } from 'next/server';

const LoadDB = async () => {
	await connectDB();
};

LoadDB();

export async function GET(request: NextRequest) {
	const todos = await TodoModel.find({});
	return NextResponse.json({ data: todos });
}

export async function POST(request: NextRequest) {
	const { title, description } = await request.json();
	await TodoModel.create({
		title,
		description,
	});
	return NextResponse.json({ msg: 'Todo Created' });
}

export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get('id');
	await TodoModel.findByIdAndDelete(id);

	return NextResponse.json({ msg: 'Todo Deleted' });
}

export async function PUT(request: NextRequest) {
	const id = request.nextUrl.searchParams.get('id');
	await TodoModel.findByIdAndUpdate(id, {
		$set: {
			isCompleted: true,
		},
	});

	return NextResponse.json({ msg: 'Todo Updated' });
}
