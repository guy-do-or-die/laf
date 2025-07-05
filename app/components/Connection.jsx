import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "./ui/button";

import { useAccount } from '../wallet'

import {notify} from './Notification'

export default function Connection() {
    const { logged, login, logout } = useAccount();
    const [location, setLocation] = useLocation();

    useEffect(() => {
        if (logged && location === '/') {
            setLocation('/items');
            notify('Connected', 'success');
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
                <Button variant="ghost" onClick={() => {logout(); notify('Disconnected', 'success')}}>Disconnect</Button>
                :
                <Button variant="default" onClick={handleLogin}>Connect</Button>
            }
        </div>
    )
}