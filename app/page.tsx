'use client';

import Todo from '@/components/todo';
import axios from 'axios';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function Home() {
	const [formData, setFormData] = useState<Todo>({
		title: '',
		description: '',
	});

	const [todos, setTodos] = useState<Todo[]>([]);

	const fetchTodos = async () => {
		const res = await axios('/api');
		setTodos(res.data.data);
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData(form => ({ ...form, [name]: value }));
	};

	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault();

		try {
			// api request
			const response = await axios.post('/api', formData);
			toast.success(response.data.msg);
			setFormData({
				title: '',
				description: '',
			});
			await fetchTodos();
		} catch (e) {
			toast.error('Error');
		}
	};

	const deleteTodo = useCallback(async (id: string) => {
		try {
			const response = await axios.delete('/api', {
				params: {
					id,
				},
			});
			toast.success(response.data.msg);
			await fetchTodos();
		} catch (error) {
			toast.error('Error');
		}
	}, []);

	const completeTodo = useCallback(async (id: string) => {
		try {
			const response = await axios.put(
				'/api',
				{},
				{
					params: {
						id,
					},
				}
			);
			toast.success(response.data.msg);
			await fetchTodos();
		} catch (error) {
			toast.error('Error');
		}
	}, []);

	return (
		<>
			<form
				onSubmit={onSubmitHandler}
				className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
			>
				<input
					type="text"
					name="title"
					value={formData.title}
					placeholder="Enter Title"
					className="px-3 py-2 border-2 w-full"
					onChange={onChangeHandler}
				/>
				<textarea
					name="description"
					value={formData.description}
					placeholder="Enter Description"
					className="px-3 py-2 border-2 w-full"
					onChange={onChangeHandler}
				></textarea>
				<button
					type="submit"
					className="bg-orange-600 py-3 px-11 text-white"
				>
					Add Todo
				</button>
			</form>

			<div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="px-6 py-3"
							>
								Id
							</th>
							<th
								scope="col"
								className="px-6 py-3"
							>
								Title
							</th>
							<th
								scope="col"
								className="px-6 py-3"
							>
								Description
							</th>
							<th
								scope="col"
								className="px-6 py-3"
							>
								Status
							</th>
							<th
								scope="col"
								className="px-6 py-3"
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{todos.map(todo => (
							<Todo
								// key={todo._id}
								key={todo.id}
								todo={todo}
								deleteTodo={deleteTodo}
								completeTodo={completeTodo}
							/>
						))}
					</tbody>
				</table>
			</div>

			<ToastContainer theme="dark" />
		</>
	);
}
