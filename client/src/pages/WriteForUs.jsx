import React from 'react';
import Navbar from '../components/Navbar';

const WriteForUs = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <svg className="w-10 h-10 text-blue-600 mr-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">Join Our Writing Community</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Quill isn't just a platform—it's a <span className="font-semibold text-blue-600">home for writers</span> who value craft, 
              creativity, and meaningful connection with readers.
            </p>
            
            <div className="bg-pink-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Write With Us?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reach engaged readers who appreciate quality writing</li>
                <li>Join a supportive community of fellow writers</li>
                <li>Access exclusive writing resources and workshops</li>
                <li>Opportunities to be featured in our curated collections</li>
              </ul>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What We're Looking For</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">🎯 Authentic Voices</h3>
                <p className="text-gray-600">We celebrate diverse perspectives and unique styles.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">✨ Craftsmanship</h3>
                <p className="text-gray-600">Attention to language, structure, and storytelling.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">💡 Fresh Ideas</h3>
                <p className="text-gray-600">Original concepts that make readers think differently.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">❤️ Passion</h3>
                <p className="text-gray-600">Writing that comes from a place of genuine interest.</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Submission Guidelines</h2>
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-2">Formatting</h3>
              <p className="text-gray-600 mb-4">
                Submit in .docx or .md format with clear headings. We prefer pieces between 
                800-3000 words, but exceptional work outside this range is considered.
              </p>
              
              <h3 className="font-medium text-gray-900 mb-2">Genres We Feature</h3>
              <p className="text-gray-600">
                Personal essays, short fiction, poetry, literary analysis, and thought-provoking 
                nonfiction across all subjects.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <h3 className="font-semibold text-gray-900 mb-2">Ready to Share Your Work?</h3>
              <p className="text-gray-700">
                Create an account and start publishing immediately, or email us at 
                <a href="mailto:exjash@gmail.com" className="text-blue-600 hover:underline"> submissions@quillblog.com</a> 
                &nbsp; for featured consideration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WriteForUs;