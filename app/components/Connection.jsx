import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "./ui/button";

import { useAccount } from '../wallet'

export default function Connection() {
    const { logged, login, logout } = useAccount();
    const [location, setLocation] = useLocation();

    // Redirect to /items when logged in
    useEffect(() => {
        if (logged && location === '/') {
            setLocation('/items');
        }
    }, [logged, location, setLocation]);

    const handleLogin = () => {
        login();
    };

    return (
        <div>
            {
                logged 
                ?
                <Button onClick={logout}>Disconnect</Button>
                :
                <Button onClick={handleLogin}>Connect</Button>
            }
        </div>
    )
}