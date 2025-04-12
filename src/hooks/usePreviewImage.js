import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
// import useShowToast from './useShowToast';

const usePreviewImage = () => {
  const [imageURL, setImageURL] = useState(null);
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImageURL(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: 'Invalid File Type',
        description: 'Please select an image file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setImageURL(null);
    }
  };

  return { handleImageChange, imageURL, setImageURL };
}

export default usePreviewImage;
