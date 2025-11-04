
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { CalendarIcon, UserIcon, PenSquareIcon, Trash2Icon } from '../components/icons';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, deletePost } = usePosts();

  if (!id) {
    return <div className="text-center text-red-500">Post ID is missing.</div>;
  }
  
  const post = getPost(id);

  if (!post) {
    return <div className="text-center">Post not found.</div>;
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12">
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-8" />
      )}
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{post.title}</h1>
      <div className="flex flex-wrap items-center text-md text-gray-500 dark:text-gray-400 space-x-6 mb-8">
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <time dateTime={post.createdAt}>{postDate}</time>
        </div>
      </div>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <div className="border-t dark:border-gray-700 pt-6 flex justify-end gap-4">
        <Link to={`/edit/${post.id}`} className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          <PenSquareIcon className="h-5 w-5" />
          Edit
        </Link>
        <button onClick={handleDelete} className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
          <Trash2Icon className="h-5 w-5" />
          Delete
        </button>
      </div>
    </article>
  );
};

export default PostPage;
