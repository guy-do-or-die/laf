import Logo from './Logo'
import Navigation from './Navigation'
import Notification from './Notification'
import Connection from './Connection'

import { MessagingStatus } from '@/components/MessagingStatus'


export default function Header() {
    return (
        <header className="w-full">
            <div className="container mx-auto py-4 px-4">
                {/* Mobile Layout */}
                <div className="flex flex-col space-y-4 md:hidden">
                    <div className="flex items-center justify-between">
                        <Logo />
                        <div className="flex items-center space-x-2">
                            <MessagingStatus />
                            <Connection />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Notification />
                    </div>
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Logo />
                        <Navigation />
                    </div>
                    <div className="flex-grow flex justify-center">
                        <Notification />
                    </div>
                    <div className="flex-shrink-0 flex items-center space-x-3">
                        <MessagingStatus />
                        <Connection />
                    </div>
                </div>
            </div>
        </header>
    )
}