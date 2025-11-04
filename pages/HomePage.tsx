
import React from 'react';
import { usePosts } from '../context/PostsContext';
import PostCard from '../components/PostCard';

const HomePage: React.FC = () => {
  const { posts } = usePosts();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">The Gemini Blog</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">AI-Powered Insights and Stories</p>
      </div>
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">No posts yet!</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Why not create the first one?</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
