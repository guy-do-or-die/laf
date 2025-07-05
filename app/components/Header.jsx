import { Link } from 'wouter'
import Notification from './Notification'
import Connection from './Connection'
import { MessageSquare } from 'lucide-react'


export default function Header() {
    return (
        <header className="w-full">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold"><a href="/">Laf is... Lost and Found</a></h1>
                </div>
                <div className="flex-grow mx-4">
                    <nav className="flex items-center space-x-4">
                        <Link to="/items">
                            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Items</span>
                        </Link>
                        <Link to="/register">
                            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Register</span>
                        </Link>
                        <Link to="/messages">
                            <span className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Messages
                            </span>
                        </Link>
                    </nav>
                </div>
                <div className="flex-grow">
                    <Notification />
                </div>
                <div className="flex-shrink-0">
                    <Connection />
                </div>
            </div>
        </header>
    )
}