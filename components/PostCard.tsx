
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { CalendarIcon, UserIcon } from './icons';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const snippet = post.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      <Link to={`/post/${post.id}`}>
        {post.imageUrl && (
          <img className="w-full h-48 object-cover" src={post.imageUrl} alt={post.title} />
        )}
      </Link>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-2">
            <div className="flex items-center gap-1.5">
                <UserIcon className="h-4 w-4" />
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={post.createdAt}>{postDate}</time>
            </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          <Link to={`/post/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{snippet}</p>
        <Link to={`/post/${post.id}`} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          Read more &rarr;
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
