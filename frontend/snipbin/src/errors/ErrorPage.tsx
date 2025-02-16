import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorBoundary() {
  const error: any = useRouteError();
  
  console.log(error)

  // Handle Router-specific errors
  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Oops! {error.status}</h1>
        <p className="text-gray-600">{error.statusText}</p>
        {error.data?.message && (
          <p className="text-red-600">{error.data.message}</p>
        )}
      </div>
    );
  }

  // Handle other errors
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
      <p className="text-gray-600">
        {error?.message || 'An unexpected error occurred'}
      </p>
    </div>
  );
};