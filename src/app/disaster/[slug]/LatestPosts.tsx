import React from 'react'
import { posts } from '@/data/posts'

const LatestPosts = () => {


// Example usage

// Display in an HTML element

    return (
        <div className='px-4 w-full'>
            <h2 className='text-3xl text-[#276fb3] font-[900]'>Latest Posts</h2>
            <div className={"flex flex-wrap gap-8"}>
            {posts.map((post, index) => (
                <div key={index} className='my-4 p-4 border border-gray-300 rounded-lg min-w-[400px] max-w-[400px]'>
                    {/*{post.image && (*/}
                        <img
                            src={post.image}
                            alt="Post Image"
                            className='w-full h-48 object-cover mb-4 rounded'
                        />
                    {/*)}*/}
                    <p className='text-lg mb-2'>{post.description}</p>
                    <p className='text-sm text-gray-600 mb-2'>Platform: {post.platform}</p>
                    <a
                        href={post.source}
                        className='text-blue-500 hover:underline'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Read more
                    </a>
                </div>
            ))}
            </div>
        </div>
    )
}

export default LatestPosts
