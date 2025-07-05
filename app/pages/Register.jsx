import TxButton from "../components/TxButton";

import { useSimulateLafRegisterItem, useWriteLafRegisterItem } from "../contracts"


export default function Register() {
    const params = {args: ["0x7b996E7B81cCC8014FfcDB23085C93238fE81d14"]}

    return (
        <div>
            <TxButton
                simulateHook={useSimulateLafRegisterItem}
                writeHook={useWriteLafRegisterItem}
                params={params}
                text="Register Item"
            />
        </div>
    )
}