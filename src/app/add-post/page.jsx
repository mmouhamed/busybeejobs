'use client'
import { useState } from "react";
import styles from './post.css'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter()

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch('/api/add-post', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, content}) })

            router.refresh()
        } catch(error) {
            console.error(error)
        }

        // Clear the form inputs after submission
        setTitle('');
        setContent('');
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href={'/'}>View Feed</Link>
            <h1>Add Post</h1>
            <form onSubmit={handleSubmit} className="styles">
                {/* Title Input */}
                <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>

                {/* Content Input */}
                <div>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}