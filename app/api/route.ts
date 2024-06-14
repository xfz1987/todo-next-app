import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	const data = await prisma.todo.findMany();
	return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
	const { title, description } = await request.json();
	await prisma.todo.create({
		data: {
			title,
			description,
		},
	});
	return NextResponse.json({ msg: 'Todo Created' });
}

export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get('id')!;
	if (!id) {
		return NextResponse.json({ msg: 'Todo Delete Failed' });
	}
	await prisma.todo.delete({
		where: {
			id,
		},
	});

	return NextResponse.json({ msg: 'Todo Deleted' });
}

export async function PUT(request: NextRequest) {
	const id = request.nextUrl.searchParams.get('id');
	if (!id) {
		return;
	}
	await prisma.todo.update({
		where: { id },
		data: {
			isCompleted: true,
		},
	});

	return NextResponse.json({ msg: 'Todo Updated' });
}
