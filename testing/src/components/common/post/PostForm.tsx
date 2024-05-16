"use client"
import React, { useState } from 'react';
import { axiosInstance } from '@/lib/axios';

const AddPostForm: React.FC = () => {
  const [postContent, setPostContent] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/add-post', {
        postContent: postContent
      });
      console.log(response.data);
      
      setPostContent('');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Enter your post content"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPostForm;
