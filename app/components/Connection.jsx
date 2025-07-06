import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from "./ui/button";

import { useAccount } from '../wallet'

import {notify} from './Notification'

export default function Connection() {
    const { logged, login, logout } = useAccount();
    const [location, setLocation] = useLocation();
    const hasNotified = useRef(false);

    useEffect(() => {
        if (logged && location === '/' && !hasNotified.current) {
            setLocation('/items');
            notify('Connected', 'success');
            hasNotified.current = true;
        }
        if (!logged) {
            hasNotified.current = false;
        }
    }, [logged, location, setLocation]);

    const handleLogin = () => {
        login();
    };

    const handleLogout = () => {
        logout();
        notify('Disconnected', 'success');
        hasNotified.current = false;
    };

    return (
        <div className="flex items-center">
            {
                logged 
                ?
                <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Disconnect
                </Button>
                :
                <Button 
                    onClick={handleLogin}
                    className="bg-white text-blue-600 hover:bg-blue-50 font-medium"
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