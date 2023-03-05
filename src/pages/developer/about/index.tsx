function DeveloperAbout () {
  return (
    <div />
    // <div>
    //   <div className='w-full top-0 pt-3 pb-6'>
    //     <div className='w-[90%] mx-auto'>
    //       <div className='flex gap-4 p-8'>
    //         <div className='rounded-lg bg-white border shadow-md py-4 px-8'>
    //           <div className='w-full md:w-[330px]'>
    //             <div className="bg-gray-100 h-full overflow-hidden rounded-[35px]">
    //               Image
    //             </div>
    //           </div>
    //         </div>

  //         <div className='rounded-lg bg-white border shadow-md py-4 px-8'>
  //           <div className='flex flex-1 flex-col gap-6'>
  //             <div>
  //               <h3 className="text-4xl font-medium mb-2.5">Who am i?</h3>
  //               <p className="text-gray-lite leading-7">
  //                 {`I'm Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media. I enjoy turning complex problems into simple, beautiful and intuitive designs.`}
  //               </p>
  //               <p className="text-gray-lite leading-7 mt-2.5">
  //                 {`My aim is to bring across your message and identity in the most creative way. I created web design for many famous brand companies.`}
  //               </p>
  //             </div>

  //             <div>
  //               <h3 className="text-4xl font-medium mb-2.5">Personal Info</h3>
  //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  //                 <div className='flex gap-3 items-center'>
  //                   <div className='rounded-md w-[40px] h-[50px] p-1 shadow-md text-secondary'>
  //                     <svg width='100%' height='100%' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  //                       <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  //                     </svg>
  //                   </div>
  //                   <div>
  //                     <p className="text-xs text-gray-lite">Phone</p>
  //                     <h6 className="font-medium">+123 456 7890</h6>
  //                   </div>
  //                 </div>

  //                 <div className='flex gap-3 items-center'>
  //                   <div className='rounded-md w-[40px] h-[50px] p-1 shadow-md text-success'>
  //                     <svg width='100%' height='100%' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  //                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  //                       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  //                     </svg>
  //                   </div>
  //                   <div>
  //                     <p className="text-xs text-gray-lite">Location</p>
  //                     <h6 className="font-medium">Philippines</h6>
  //                   </div>
  //                 </div>

  //                 <div className='flex gap-3 items-center'>
  //                   <div className='rounded-md w-[40px] h-[50px] p-1 shadow-md text-error'>
  //                     <svg width='100%' height='100%' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  //                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
  //                     </svg>
  //                   </div>
  //                   <div>
  //                     <p className="text-xs text-gray-lite">Email</p>
  //                     <h6 className="font-medium">example@mail.com</h6>
  //                   </div>
  //                 </div>

  //                 <div className='flex gap-3 items-center'>
  //                   <div className='rounded-md w-[40px] h-[50px] p-1 shadow-md text-primary'>
  //                     <svg width='100%' height='100%' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  //                       <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  //                     </svg>
  //                   </div>
  //                   <div>
  //                     <p className="text-xs text-gray-lite">Birthday</p>
  //                     <h6 className="font-medium">February 24, 2023</h6>
  //                   </div>
  //                 </div>

  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  )
}

export default DeveloperAbout
