import { formatUnits } from 'viem'
import { useAccount } from '../wallet'

import { useReadUsdcBalanceOf } from '../contracts';


export default function Info() {
    const { address } = useAccount();
    const { data: balance, isSuccess } = useReadUsdcBalanceOf({ args: [address] });

    return (
        <div>
            <p>{address}</p>
            { isSuccess ?  <p>${formatUnits(balance, 6)}</p> : <p>Loading...</p> }
        </div>
    )
}