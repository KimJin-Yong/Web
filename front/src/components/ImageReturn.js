import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageReturn = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_image', {
                    responseType: 'blob', // 응답 유형을 blob으로 설정
                });
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImage(imageObjectURL);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, []);

    return (
        <div>
            {image && <img src={image} alt="Loaded from server" style={{ maxWidth: '100%' }} />}
        </div>
    );
};

export default ImageReturn;
