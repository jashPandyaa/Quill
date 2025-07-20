import React from 'react';
import Navbar from '../components/Navbar';

const Advertise = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <svg className="w-10 h-10 text-purple-600 mr-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">Partner With Quill</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Reach a highly engaged audience of <span className="font-semibold text-purple-600">readers and writers</span> who value 
              quality content and thoughtful perspectives.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Audience</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">75%</p>
                  <p className="text-gray-600">College educated</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">82%</p>
                  <p className="text-gray-600">Age 19-54</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">50+</p>
                  <p className="text-gray-600">Monthly readers</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Advertising Options</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">📢 Sponsored Content</h3>
                <p className="text-gray-600">Native articles that match our editorial style.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">📧 Newsletter Features</h3>
                <p className="text-gray-600">Reach our most engaged subscribers.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">✨ Branded Collections</h3>
                <p className="text-gray-600">Curated content around your brand values.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">🤝 Custom Partnerships</h3>
                <p className="text-gray-600">Tailored collaborations for mutual benefit.</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Advertisers Love Us</h2>
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-2">Quality Context</h3>
              <p className="text-gray-600 mb-4">
                Your message appears alongside premium content, not random clickbait.
              </p>
              
              <h3 className="font-medium text-gray-900 mb-2">Engaged Audience</h3>
              <p className="text-gray-600 mb-4">
                Our readers spend an average of 8 minutes per article.
              </p>
              
              <h3 className="font-medium text-gray-900 mb-2">Brand Safety</h3>
              <p className="text-gray-600">
                Strict content guidelines ensure a positive environment for your message.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-semibold text-gray-900 mb-2">Get Started</h3>
              <p className="text-gray-700">
                Email our partnerships team at 
                <a href="mailto:jashpandyaa@gmail.com" className="text-blue-600 hover:underline"> advertise@quillblog.com</a> 
                to discuss opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Advertise;