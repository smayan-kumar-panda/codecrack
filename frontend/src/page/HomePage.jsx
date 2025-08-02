import React from 'react'

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center mt-14 px-4 relative'>
      {/* Gradient background with better colors and smooth transition */}
      <div 
        className='absolute top-16 left-0 w-2/3 h-2/3 rounded-md blur-3xl opacity-40 z-0' 
        style={{
          background: 'radial-gradient(circle at top left, #a3e635, #65a30d, #047857)'
        }}
      ></div>

      <h1 className='text-4xl font-extrabold z-10 text-center text-gray-900 dark:text-gray-100'>
        Welcome to <span className='text-lime-500'>CodeCrack</span>
      </h1>
      <p className='mt-4 text-center text-lg font-semibold text-gray-600 dark:text-gray-300 z-10 max-w-xl'>
        A Platform inspired by CodeChef and Leetcode. Where you can practice your coding skills and solve coding problems.
      </p>
    </div>
  )
}

export default HomePage
