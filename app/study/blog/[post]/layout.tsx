import React from 'react';

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

export async function generateMetadata({ params }: { params: { post: string } }) {
	return {
		title: params.post,
	};
}
