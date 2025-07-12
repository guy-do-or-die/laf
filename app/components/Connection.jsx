import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "./ui/button";

import { useAccount } from '../wallet'

import {notify} from './Notification'

export default function Connection() {
    const { loggedIn, login, logout, address } = useAccount();
    const [location, setLocation] = useLocation();

    useEffect(() => {
        if (loggedIn && location === '/') {
            setLocation('/items');
            notify('Connected', 'success');
        }
    }, [loggedIn, location, setLocation]);

    const handleLogin = () => {
        login();
    };

    return (
        <div>
            {
                loggedIn 
                ?
                <Button variant="ghost" onClick={() => {logout(); notify('Disconnected', 'success')}}>Disconnect</Button>
                :
                <Button variant="default" onClick={handleLogin}>Connect</Button>
            }
        </div>
    )
}