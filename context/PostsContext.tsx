
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Post } from '../types';

interface PostsContextType {
  posts: Post[];
  getPost: (id: string) => Post | undefined;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, updatedPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deletePost: (id: string) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const initialPosts: Post[] = [
    {
        id: '1',
        title: 'Getting Started with React and Tailwind CSS',
        content: '<p>This is a sample post about integrating React with Tailwind CSS for rapid UI development. We will explore the benefits and show some examples.</p><h2>Why Tailwind?</h2><p>Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without ever leaving your HTML.</p>',
        author: 'Jane Doe',
        imageUrl: 'https://picsum.photos/seed/react/800/400',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '2',
        title: 'The Power of Generative AI',
        content: '<p>Generative AI models like Gemini are transforming how we create content. This post delves into the technology and its potential applications.</p><h2>How it works</h2><p>By learning from vast amounts of data, these models can generate new text, images, and more, that are coherent and contextually relevant.</p>',
        author: 'John Smith',
        imageUrl: 'https://picsum.photos/seed/ai/800/400',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    }
];


export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const getPost = (id: string) => posts.find(p => p.id === id);

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const updatePost = (id: string, updatedPostData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    setPosts(prevPosts =>
      prevPosts.map(p =>
        p.id === id ? { ...p, ...updatedPostData, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  const deletePost = (id: string) => {
    setPosts(prevPosts => prevPosts.filter(p => p.id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, getPost, addPost, updatePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
