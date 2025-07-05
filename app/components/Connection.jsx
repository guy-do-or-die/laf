import { Button } from "./ui/button";
import { useConnect } from 'wagmi'


export default function Connection() {
    const { connectors, connect } = useConnect()

    return (
        <div>
            <Button onClick={() => connect({ connector: connectors[0] })}>Connect</Button>
        </div>
    )
}