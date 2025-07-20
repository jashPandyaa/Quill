import React from 'react';
import Navbar from '../components/Navbar';

const Privacy = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Privacy Matters</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-700">
                At Quill, we believe <span className="font-medium">transparency builds trust</span>. 
                This policy explains what data we collect and why, in clear, straightforward language.
              </p>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Key Principles</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">🔒 Minimal Data</h3>
                <p className="text-gray-600">We only collect what's necessary to provide our services.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">🛡️ Strong Protection</h3>
                <p className="text-gray-600">Industry-standard security measures safeguard your information.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">🚫 No Surprises</h3>
                <p className="text-gray-600">We'll never sell your data or use it in unexpected ways.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">✋ Your Control</h3>
                <p className="text-gray-600">Easy tools to access, correct, or delete your information.</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Collect</h2>
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-2">Account Information</h3>
              <p className="text-gray-600 mb-4">
                When you create an account, we collect your name, email address, and password 
                (stored securely using hashing).
              </p>
              
              <h3 className="font-medium text-gray-900 mb-2">Content</h3>
              <p className="text-gray-600 mb-4">
                The blogs and comments you choose to share on our platform.
              </p>
              
              <h3 className="font-medium text-gray-900 mb-2">Usage Data</h3>
              <p className="text-gray-600">
                Anonymous information about how you interact with Quill to improve our services.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <h3 className="font-semibold text-gray-900 mb-2">Have Questions?</h3>
              <p className="text-gray-700">
                We're happy to clarify any aspect of our privacy practices. 
                Email us at <a href="mailto:jashpandyaa@gmail.com" className="text-blue-600 hover:underline">privacy@quillblog.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Privacy;