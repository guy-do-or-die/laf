
export default function Footer() {
    return (
        <footer className="w-full py-8 mt-auto bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-gray-600 font-medium">Laf is... Lost and Found</span>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Laf is... Lost and Found. Built with ❤️ on blockchain.
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                            Helping reunite people with their lost items
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}