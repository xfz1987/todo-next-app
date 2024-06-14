import React from 'react';

function page({
	params,
}: {
	params: {
		post: string;
	};
}) {
	return (
		<div>
			<h1>Post: {params.post}</h1>
		</div>
	);
}

export default page;
