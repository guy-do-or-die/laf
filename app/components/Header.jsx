import Notification from './Notification'
import Connection from './Connection'
import Logo from './Logo'
import { XMTPStatus } from './XMTPStatus'


export default function Header() {
    return (
        <header className="w-full">
            <div className="container mx-auto py-4 px-4">
                {/* Mobile Layout */}
                <div className="flex flex-col space-y-4 md:hidden">
                    <div className="flex items-center justify-between">
                        <Logo />
                        <div className="flex items-center space-x-2">
                            <XMTPStatus />
                            <Connection />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Notification />
                    </div>
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                    <Logo />
                    <div className="flex-grow flex justify-center">
                        <Notification />
                    </div>
                    <div className="flex-shrink-0 flex items-center space-x-3">
                        <XMTPStatus />
                        <Connection />
                    </div>
                </div>
            </div>
        </header>
    )
}