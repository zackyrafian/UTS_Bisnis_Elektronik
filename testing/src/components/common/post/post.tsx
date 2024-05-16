"use client"
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]); // Gunakan tipe data yang sesuai dengan struktur data posting Anda

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts');
        setPosts(response.data); // Mengatur data posting dari respons ke state
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts(); // Panggil fungsi fetchPosts saat komponen dimuat
  }, []); // Gunakan array kosong sebagai dependencies agar useEffect hanya dijalankan sekali saat komponen dimuat

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.post}</li>
          // Sesuaikan dengan struktur data posting Anda, misalnya post.post
        ))}
      </ul>
    </div>
  );
};

export default PostList;
