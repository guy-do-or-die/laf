import { Button } from "./ui/button"; 

import { useAccount } from '../wallet'


function TxButton({simulateHook, writeHook, params, text}) {

    const { address, logged } = useAccount()

    const {
        data: simulateData,
        isSuccess: isSimulateSuccess,
        isError: isSimulateError,
        error: simulateError
    } = simulateHook({
        query: { enabled: logged },
        ...params
    })

    const { writeContract } = writeHook({
        query: { enabled: logged && isSimulateSuccess },
        ...params
    })

    const onClick = () => writeContract({ ...simulateData.request, account: address })

    return (
        <Button variant="outline" onClick={onClick} disabled={!logged || !simulateData}>
            {text} 
        </Button>
    )
}

export default TxButton;