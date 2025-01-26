import React from 'react';
import Link from 'next/link';
import { FaClipboardList, FaRegGem, FaMagic } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-purple-400 to-purple-600 py-16'>
        <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6'>
          <div>
            <h2 className='text-4xl font-bold text-white mb-4'>Create Forms in Minutes</h2>
            <p className='text-lg text-white mb-6'>Build powerful, customizable forms for any purpose with our easy-to-use form builder tool.</p>
            <Link href="/auth">
              <button className='bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-400 transition'>
                Start Creating Forms
              </button>
            </Link>
          </div>
          <div className='flex justify-center items-center'>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2913/2913988.png" 
              className='w-48 h-48 object-contain' 
              alt="Contract Icon" 
            />          
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className='h-screen bg-purple-100'>
        <div className='max-w-screen-xl mx-auto text-center px-6 py-16'>
          <h3 className='text-3xl font-bold text-gray-800 mb-8'>Features</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            <div className='border border-gray-300 bg-white p-6 rounded-lg transition transform hover:scale-105 hover:shadow-lg'>
              <FaClipboardList className='text-3xl text-purple-600 mb-4' />
              <h4 className='text-xl font-semibold text-gray-800 mb-4'>Drag & Drop Interface</h4>
              <p className='text-gray-600'>Easily create and organize form fields with our intuitive drag-and-drop editor.</p>
            </div>
            <div className='border border-gray-300 bg-white p-6 rounded-lg transition transform hover:scale-105 hover:shadow-lg'>
              <FaRegGem className='text-3xl text-purple-600 mb-4' />
              <h4 className='text-xl font-semibold text-gray-800 mb-4'>Customizable Templates</h4>
              <p className='text-gray-600'>Choose from a variety of customizable form templates for any occasion.</p>
            </div>
            <div className='border border-gray-300 bg-white p-6 rounded-lg transition transform hover:scale-105 hover:shadow-lg'>
              <FaMagic className='text-3xl text-purple-600 mb-4' />
              <h4 className='text-xl font-semibold text-gray-800 mb-4'>Advanced Logic</h4>
              <p className='text-gray-600'>Set advanced rules and conditions to create dynamic, interactive forms.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
