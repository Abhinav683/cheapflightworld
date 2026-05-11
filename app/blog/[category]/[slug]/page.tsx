"use client";

import { useState } from "react";

import { BookOpen } from 'lucide-react';

import Link from "next/link";
export default  function BlogPostPage({ params }: { params: { category: string; slug: string } }) {
    const { category, slug } =  params;
    const mycategory = ['All Articles', 'Destination', 'Tips & Tricks', 
        'Travel Tech', 'Budget Travel', 'News & Updates'] ;
        const [active, setActive] = useState(mycategory[0]);
    return (
        <main className=" w-full bg-slate-50 text-slate-900 gap-12  flex flex-col py-24 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 bg-[#EEE9DF] rounded-3xl ">
                <div className='flex gap-3 p-8 justify-center flex-col'>
                    <div className="flex bg-white w-fit p-2 font-semibold rounded-lg items-center gap-2 text-sm text-black mb-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{category} Blog</span>
                    </div>
                    <h1 className='font-bold text-3xl'>Inspiration & Guides</h1>
                    <p>Discover expert tips, curated itineraries, and hidden gems
                        for your next journey.</p>
                    <div className='w-[70%] rounded-full bg-white p-1 flex justify-between items-center gap-2'>

                        <input type="text" placeholder="Enter your email address"
                            className="placeholder:text-gray-500 p-2 w-full outline-none border-none" />
                        <button className=" cursor-pointer  bg-black text-white px-5 py-2 rounded-full w-fit hover:bg-gray-800 transition
                             ">Subscribe</button>
                    </div>
                </div>
                <div>
                    <img src="/blog.jpg" alt="Blog post"  />                                                                                  
                </div>
            </div>
          <div className="w-full flex mx-6 gap-8">
      {mycategory.map((cat) => (
        <div
          key={cat}
          onClick={() => setActive(cat)}
          className={`w-fit rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition
            ${
              active === cat
                ? "bg-black text-white"
                : "bg-[#EEE9DF] text-gray-700 hover:bg-[#E0D8C3]"
            }`}
        >
          {cat}
        </div>
      ))}
    </div>

    <div>
        <h2> Latest Articles</h2>
        <p>€</p>
    </div>
        </main>
    );
}
