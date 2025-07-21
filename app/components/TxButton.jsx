
import { useEffect } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'

import { LoaderCircle } from 'lucide-react'

import { Button } from "./ui/button"; 

import { notify, hide, parseError } from '../components/Notification'
import { txLink } from '../components/Utils'
import { useAccount } from '../wallet'
import { 
    determineTransactionPhase, 
    isTransactionLoading, 
    shouldDisableTransaction, 
    getTransactionButtonText, 
    createTransactionExecutor 
} from '@/services/transactionService';



function TxButton({simulateHook, writeHook, params, text}) {

    const { address, loggedIn } = useAccount()

    const {
        data: simulateData,
        isSuccess: isSimulateSuccess,
        isLoading: isSimulateLoading,
        isError: isSimulateError,
        error: simulateError
    } = simulateHook({
        query: { enabled: params.enabled && loggedIn },
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
        query: { enabled: params.enabled && loggedIn && isSimulateSuccess },
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
        query: { enabled: loggedIn && params.enabled && writeData },
        ...params,
    })

    useEffect(() => {
        if (isSimulateError) {
            params.onSimulateError?.(simulateError) || notify(parseError(simulateError), 'error')
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
        if (params.enabled && isSimulateLoading) {
            notify('Loading', 'loading', { id: 'simulating' })
        } else {
            hide('simulating')
        }
    }, [isSimulateLoading])

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


    const transactionPhase = determineTransactionPhase({
        isSimulateLoading,
        isSimulateSuccess,
        isSimulateError,
        isWritePending,
        isWriteSuccess,
        isWriteError,
        isConfirmationLoading,
        isConfirmationSuccess,
        isConfirmationError
    });

    const loading = isTransactionLoading(transactionPhase);
    const disabled = shouldDisableTransaction({
        loggedIn,
        enabled: params?.enabled,
        simulateData,
        phase: transactionPhase
    });
    const buttonText = getTransactionButtonText(transactionPhase, text);
    const onClick = createTransactionExecutor({
        writeContract,
        simulateData,
        address
    });

    return (
        <Button variant="outline" className="flex-1" onClick={onClick} disabled={disabled}>
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {buttonText}
        </Button>
    )
}

export default TxButton;