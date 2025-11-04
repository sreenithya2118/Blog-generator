
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import ReactQuill from 'react-quill';
import { generateBlogPost } from '../services/geminiService';
import { WandSparklesIcon } from '../components/icons';
import Spinner from '../components/Spinner';

const PostEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, addPost, updatePost } = usePosts();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const post = getPost(id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
        setImageUrl(post.imageUrl || '');
      }
    }
  }, [id, isEditing, getPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !author) {
      alert('Please fill in title, content, and author.');
      return;
    }

    const postData = { title, content, author, imageUrl };
    if (isEditing && id) {
      updatePost(id, postData);
    } else {
      addPost(postData);
    }
    navigate('/');
  };

  const handleGenerateContent = async () => {
    if (!title) {
        alert("Please provide a title to generate content.");
        return;
    }
    setIsGenerating(true);
    try {
        const generatedContent = await generateBlogPost(title);
        setContent(generatedContent);
    } catch (error) {
        console.error("Content generation failed", error);
        alert("Failed to generate content.");
    } finally {
        setIsGenerating(false);
    }
  }

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL (Optional)</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://picsum.photos/800/400"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
            <div className="flex justify-between items-center mb-1">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                 <button 
                    type="button" 
                    onClick={handleGenerateContent}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGenerating ? <Spinner /> : <WandSparklesIcon className="h-5 w-5" />}
                    <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
                </button>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent}
                    modules={quillModules}
                    className="quill-editor"
                    style={{'--ql-color': 'var(--tw-prose-body)'}}
                />
            </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          >
            {isEditing ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditorPage;
