export function LAFMain() {
  return (
    <div className="min-h-screen font-sans antialiased p-8">
      <h1 className="text-2xl font-bold mb-4">LAF Project</h1>
      Hello I am LAV
      {/* Test boxes with direct CSS styles */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Direct CSS Styles:</h2>
        <div className="red-box">
          This should be a red box with white text (using direct CSS) LAV was
          here
        </div>
      </div>
      {/* Test boxes with inline styles */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Inline Styles:</h2>
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "1rem",
            borderRadius: "0.375rem",
          }}
        >
          This should be a red box with white text (using inline styles)
        </div>
      </div>
      {/* Test boxes with Tailwind CSS */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Tailwind CSS:</h2>
        <div className="bg-red-500 text-white p-4 rounded-md">
          This should be a red box with white text (using Tailwind)
        </div>
      </div>
    </div>
  );
}

export default LAFMain;
