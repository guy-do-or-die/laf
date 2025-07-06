import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from "./ui/button";

import { useAccount } from '../wallet'


export default function Connection() {
    const { loggedIn, login, logout } = useAccount();
    const [location, setLocation] = useLocation();
    const hasNotified = useRef(false);

    useEffect(() => {
        if (loggedIn && location === '/' && !hasNotified.current) {
            setLocation('/items');
            notify('Connected', 'success');
            hasNotified.current = true;
        }
        if (!loggedIn) {
            hasNotified.current = false;
        }

        if (!loggedIn && location === '/items') {
            setLocation('/');
        }
    }, [loggedIn]);

    return (
        <div className="flex items-center">
            {
                loggedIn 
                ?
                <Button 
                    variant="outline" 
                    onClick={logout}
                    className="retro-button bg-red-500 border-2 border-black text-white hover:bg-red-600"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Disconnect
                </Button>
                :
                <Button 
                    onClick={handleLogin}
                    className="retro-button bg-green-500 border-2 border-black text-white hover:bg-green-600 font-medium"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Connect Wallet
                </Button>
            }
        </div>
    )
}
