import React from 'react';
import Navbar from '../components/Navbar';

const Terms = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Agreement</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Quill</h2>
              <p className="text-gray-700">
                By using our platform, you're joining a community built on <span className="font-medium">respect, creativity, and shared passion for writing</span>. 
                These terms help maintain that environment.
              </p>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Community Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">✏️ Original Work</h3>
                <p className="text-gray-600">Only share content you've created or have permission to use.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">💬 Respectful Discourse</h3>
                <p className="text-gray-600">Critique the writing, not the writer.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">🚫 No Spam</h3>
                <p className="text-gray-600">Keep promotions relevant and minimal.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">🔞 Appropriate Content</h3>
                <p className="text-gray-600">Mark mature content appropriately.</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <div className="mb-8">
              <p className="text-gray-700 mb-4">
                You retain all rights to your original content. By posting on Quill, you grant us a 
                <span className="font-medium"> non-exclusive license</span> to display and distribute that content through our platform.
              </p>
              <p className="text-gray-700">
                We may feature exceptional work in our newsletters or promotional materials, 
                always with attribution to the author.
              </p>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Responsibility</h2>
            <p className="text-gray-700 mb-8">
              You're responsible for maintaining the confidentiality of your account credentials 
              and for all activities that occur under your account.
            </p>
            
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-semibold text-gray-900 mb-2">Changes to Terms</h3>
              <p className="text-gray-700">
                We'll notify users of significant changes to these terms. 
                Continued use of Quill after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Terms;