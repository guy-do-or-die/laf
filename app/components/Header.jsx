import Notification from './Notification'
import Connection from './Connection'


export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h1 className="text-xl font-bold">Lost & Found</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Notification />
            <Connection />
          </div>
        </div>
      </div>
    </header>
  )
}