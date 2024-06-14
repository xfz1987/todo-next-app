'use client';
import React from 'react';

function page({ params }: { params: { name: string } }) {
	return (
		<div>
			<h1>Welcome {params.name}!</h1>
		</div>
	);
}

export default page;
