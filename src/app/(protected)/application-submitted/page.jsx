export default function ApplicationSubmitted() {
    return (
        <div className="flex items-center justify-center min-h-screen pb-20">
            <div className="text-center mb-20">
                <div className="mb-6">
                    <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Application Submitted Successfully!</h1>
                <p className="text-gray-600">Thank you for your submission. We will review your application and get back to you soon.</p>
            </div>
        </div>
    );
}
