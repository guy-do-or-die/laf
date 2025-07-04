export function Header() {
  return (
    <div>
      {/* Simple header with just Tailwind classes */}
      <header className="sticky top-0 z-50 w-full border-b">
        <div className="container flex h-16 items-center">
          {/* Logo container with red background */}
          <div className="bg-red-500 mr-4 p-2 rounded">
            <a href="/" className="flex items-center">
              <span className="font-bold text-xl text-white">LAF</span>
            </a>
            <span className="text-sm text-white">Lost and Found</span>
          </div>
          
          {/* Test box with red background */}
          <div className="bg-red-500 text-white p-4 rounded">
            This should be a red box with white text
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
