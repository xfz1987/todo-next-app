import React from 'react';

type Todo = {
	title: string;
	description: string;
	isCompleted?: boolean;
} & {
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	// _id?: string;
	id?: string;
};

export default function Todo({
	todo,
	deleteTodo,
	completeTodo,
}: {
	todo: Todo;
	deleteTodo: (id: string) => Promise<void>;
	completeTodo: (id: string) => Promise<void>;
}) {
	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{/* {todo._id} */}
				{todo.id}
			</th>
			<td className={`px-6 py-4 ${todo.isCompleted ? 'line-through' : ''}`}>{todo.title}</td>
			<td className={`px-6 py-4 ${todo.isCompleted ? 'line-through' : ''}`}>{todo.description}</td>
			<td className="px-6 py-4">{todo.isCompleted ? 'Completed' : 'Pending'}</td>
			<td className="px-6 py-4 flex gap-2">
				<button
					className="py-2 px-4 bg-red-500 text-white"
					// onClick={() => deleteTodo(todo._id!)}
					onClick={() => deleteTodo(todo.id!)}
				>
					Delete
				</button>
				{todo.isCompleted ? (
					''
				) : (
					<button
						className="py-2 px-4 bg-green-500 text-white"
						// onClick={() => completeTodo(todo._id!)}
						onClick={() => completeTodo(todo.id!)}
					>
						Done
					</button>
				)}
			</td>
		</tr>
	);
}
