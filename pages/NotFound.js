function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl text-gray-700 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2 mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <a 
          href="/"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}