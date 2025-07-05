
import { useEffect } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'

import { LoaderCircle } from 'lucide-react'

import { Button } from "./ui/button"; 

import { notify, hide, parseError } from '../components/Notification'
import { txLink } from '../components/Utils'
import { useAccount } from '../wallet'



function TxButton({simulateHook, writeHook, params, text}) {

    const { address, logged } = useAccount()

    const {
        data: simulateData,
        isSuccess: isSimulateSuccess,
        isPending: isSimulatePending,
        isError: isSimulateError,
        error: simulateError
    } = simulateHook({
        query: { enabled: params.enabled && logged },
        ...params
    })

    const {
        writeContract,
        data: writeData,
        isPending: isWritePending,
        isSuccess: isWriteSuccess,
        isError: isWriteError,
        error: writeError
    } = writeHook({
        query: { enabled: params.enabled && logged && isSimulateSuccess },
        ...params
    })

    const {
        data: confirmationData,
        isError: isConfirmationError,
        isLoading: isConfirmationLoading,
        isSuccess: isConfirmationSuccess,
        error: confirmationError,
    } = useWaitForTransactionReceipt({
        confirmations: 1,
        hash: writeData,
        query: { enabled: logged && params.enabled && writeData },
        ...params,
    })

    useEffect(() => {
        if (isSimulateError) {
            params.onSimulateError?.(simulateError) || notify(parseError(simulateError), 'error')
        }
        if (isSimulateSuccess) {
            params.onSimulateSuccess?.(simulateData) || notify(simulateData?.result, 'success')
        }
        if (isSimulateError || isSimulateSuccess) {
            params.simulateCallback?.({ data: simulateData, error: simulateError })
        }
    }, [isSimulateError, isSimulateSuccess])

    useEffect(() => {
        if (isWriteError) {
            params.onWriteError?.(writeError) || notify(parseError(writeError), 'error')
        }
        if (isWriteSuccess) {
            params.onWriteSuccess?.(writeData) ||
                notify(<span>{txLink(writeData, 'Transaction')} sent</span>, 'success', { id: writeData })
        }
        if (isWriteError || isWriteSuccess) {
            params.writeCallback?.({ data: writeData, error: writeError })
        }
    }, [isWriteError, isWriteSuccess])

    useEffect(() => {
        if (isConfirmationError) {
            params.onConfirmationError?.(confirmationError) || notify(parseError(confirmationError), 'error')
        }
        if (isConfirmationSuccess) {
            params.onConfirmationSuccess?.(confirmationData) ||
                notify(<span>{txLink(confirmationData?.transactionHash, 'Transaction')} confirmed</span>, 'success')
        }
        if (isConfirmationError || isConfirmationSuccess) {
            params.confirmationCallback?.({ data: confirmationData, error: confirmationError })
        }
    }, [isConfirmationError, isConfirmationSuccess])

    useEffect(() => {
        if (params.enabled && isSimulatePending) {
            notify('Loading', 'loading', { id: 'simulating' })
        } else {
            hide('simulating')
        }
    })

    useEffect(() => {
        if (isWritePending) {
            notify('Loading', 'loading', { id: 'writing' })
        } else {
            hide('writing')
        }
        params.pendingCallback?.()
    }, [isWritePending])

    useEffect(() => {
        if (params.enabled && writeData && isConfirmationLoading) {
            notify(<span>Confirming {txLink(writeData, 'Transaction')}</span>, 'loading', { id: 'confirming' })
        } else {
            hide('confirming')
        }
    }, [isConfirmationLoading])


    const loading = isWritePending || (isConfirmationLoading && !isConfirmationSuccess && !isConfirmationError)
    const disabled = !logged || !params?.enabled || !Boolean(simulateData?.request) || loading

    const onClick = () => writeContract({ ...simulateData.request, account: address })


    simulateData && console.log('simulate error', simulateError)
    writeData && console.log('write error', writeError)
    confirmationData && console.log('confirmation error', confirmationError)

    return (
        <Button variant="outline" onClick={onClick} disabled={!logged || !simulateData || disabled}>
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {text} 
        </Button>
    )
}

export default TxButton;