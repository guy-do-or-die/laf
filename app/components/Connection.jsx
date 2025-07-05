import { Button } from "./ui/button";

import { useAccount } from '../wallet'


export default function Connection() {
    const { logged, login, logout } = useAccount()

    return (
        <div>
            {
                logged 
                ?
                <Button onClick={logout}>Disconnect</Button>
                :
                <Button onClick={login}>Connect</Button>
            }
        </div>
    )
}