import React from 'react';
import sampleImage from '../../assets/svleteJs.png';
import Image from 'next/image';

function ImagePage() {
	return (
		<>
			<h1>We will show the image here.</h1>
			<Image
				src={sampleImage}
				width={200}
				height={200}
				alt="sample img"
			/>
		</>
	);
}

export default ImagePage;
