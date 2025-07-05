import { Button } from "./ui/button"; 

import { useAccount } from 'wagmi'


function TxButton({simulateHook, writeHook, params, text}) {

    const { address } = useAccount()

    const { data: simulateData } = simulateHook({...params})

    const { writeContract } = writeHook({...params})

    const onClick = () => simulateData && writeContract({ ...simulateData.request, account: address })

    return (
        <Button onClick={onClick} disabled={!address || !simulateData}>
            {text} 
        </Button>
    )
}

export default TxButton;