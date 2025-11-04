
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import PostEditorPage from './pages/PostEditorPage';

function App() {
  return (
    <PostsProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8 flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/create" element={<PostEditorPage />} />
              <Route path="/edit/:id" element={<PostEditorPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </PostsProvider>
  );
}

export default App;
