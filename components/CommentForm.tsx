// /components/CommentForm.tsx

import { useState, FormEvent } from "react";

interface CommentFormProps {
    postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {

    const [submitStatus, setSubmitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmitStatus(true);
        setResponseMessage('Your commenting is being submitted...');
        setAlertColor('bg-yellow-500');

        const data = {
            author: (event.currentTarget.author as HTMLInputElement).value,
            authorEmail: (event.currentTarget.authorEmail as HTMLInputElement).value,
            content: (event.currentTarget.content as HTMLTextAreaElement).value.replace(/\n/g, "\\n"),
            postId: postId.toString(),
        };

        const jsonData = JSON.stringify(data);

        const response = await fetch('/api/comment', {
            method: 'POST',
            body: jsonData,
        });

        const result = await response.json();

        console.log(result);

        setSubmitStatus(true);
        setResponseMessage(result.message);

        if(response.ok) {
            setAlertColor('bg-green-500');
        }
        else {
            setAlertColor('bg-red-500');
        }

    }
    return (
        <>
        <h3 className="text-2xl pb-4 mb-4 border-b">Add your Thoughts:</h3>
        <form className="comment-form" onSubmit={handleSubmit}>
            <label htmlFor="author">First Name:</label>
            <input type="text" id="author" name="author" required />

            <label htmlFor="authorEmail">Email:</label>
            <input type="email" id="authorEmail" name="authorEmail"  required />

            <label htmlFor="content">Message:</label>
            <textarea name="content" id="content"  required ></textarea>

            <input type="hidden" name="postId" id="postId" value={postId} />

            <button type="submit">Submit</button>
        </form>

        {
            submitStatus && 
            <div className={`${alertColor} py-2 px-4 mt-4 text-slate-100 rounded-md`}>
                {responseMessage}
            </div>
        }
        </>
    )
}