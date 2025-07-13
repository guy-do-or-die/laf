import { formatUnits } from 'viem'
import { useAccount, chain } from '../wallet'

import { useReadErc20BalanceOf } from '../contracts';


export default function Info() {
    const { address } = useAccount();
    const { data: balance, isSuccess } = useReadErc20BalanceOf({ args: [address] });

    const formatAddress = (addr) => {
        if (!addr) return '';
        return `${addr.slice(0, 5)}...${addr.slice(-3)}`;
    };

    if (!address) return null;

    return (
        <div className="text-right text-sm">
            <p className="text-gray-600 font-mono">
                <a 
                    href={`${chain?.blockExplorers?.default?.url}/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                >
                    {formatAddress(address)}
                </a>
            </p>
            { isSuccess ?  
                <p className="font-semibold text-green-600">${parseFloat(formatUnits(balance, 6)).toFixed(2)}</p> : 
                <p className="text-gray-400">Loading...</p> 
            }
        </div>
    )
}