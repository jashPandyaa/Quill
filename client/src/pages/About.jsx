import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 ml-4">About Us/Our Story</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Quill was born from a simple idea: <span className="font-semibold text-blue-600">every voice deserves to be heard</span>. 
              In a world overflowing with content, we wanted to create a sanctuary for meaningful words.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Why We Exist</h2>
              <p className="text-gray-700">
                We noticed most platforms prioritize algorithms over artistry. Quill flips this model - 
                we're <span className="font-medium">writer-first</span>, celebrating the craft behind every piece.
              </p>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Our Unique Approach</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">✍️ Craft-Centric</h3>
                <p className="text-gray-600">We highlight the writing process, not just the final product.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">🌱 Growth-Focused</h3>
                <p className="text-gray-600">Resources and tools to help writers evolve their skills.</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Meet the Team</h2>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
              <div className="w-10 h-10 rounded-full mr-3 overflow-hidden bg-gray-200">
                <img
                  src="/me.png"
                  alt="Jashkumar Pandya"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                  <p className="font-medium">Jashkumar Pandya</p>
                  <p className="text-sm text-gray-500">Founder, CEO & Developer</p>
              </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-semibold text-gray-900 mb-2">Join Our Journey</h3>
              <p className="text-gray-700">
                We're more than a platform - we're a community. Whether you're a reader or writer, 
                there's a place for you here at Quill.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;