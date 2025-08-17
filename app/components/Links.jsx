import * as chains from 'viem/chains'
import { lafAddress } from '@/contracts'
import { chain } from '@/wallet'

import xUrl from '~/public/icons/x.png'
import telegramUrl from '~/public/icons/telegram.png'
import discordUrl from '~/public/icons/discord.png'
import farcasterUrl from '~/public/icons/farcaster.png'
import guildUrl from '~/public/icons/guild.png'
import gitUrl from '~/public/icons/git.png'
import openseaUrl from '~/public/icons/opensea.png'
import etherscanUrl from '~/public/icons/etherscan.png'


function Link({ href, icon, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-700 transition flex-shrink-0"
    >
      <img src={icon} alt={title} title={title} className="w-6 h-6 min-w-[24px] hover:opacity-75 transition" />
    </a>
  )
}

export default function Links() {
  const explorer = chain.blockExplorers?.default.url
  const contractAddress = lafAddress[chain.id]

  const osUrl = {
    [chains.base.id]: `https://opensea.io/assets/base/${contractAddress}`,
    [chains.baseSepolia.id]: `https://testnet.rarible.com/collection/base/${contractAddress}`,
  }[chain.id]

  return (
    <div className="links flex justify-center items-start">
      <div className="flex flex-wrap gap-x-2 md:gap-4 filter grayscale">
        <Link title="Farcaster" href="https://warpcast.com/~/channel/laf-is" icon={farcasterUrl} />
        {/*
            <Link title="Telegram" href="https://t.me/laf_is" icon={telegramUrl} />
            <Link title="Discord" href="https://discord.gg/" icon={discordUrl} />
        */}
        <Link title="Guild" href="https://era.guild.xyz/laf-is" icon={guildUrl} />
        <Link title="X" href="https://x.com/laf_is_found" icon={xUrl} />
        {osUrl ? (
          <Link title="Opensea" href={osUrl} icon={openseaUrl} />
        ) : (
          ''
        )}
        {chain ? (
          <Link title="Contract" href={`${explorer}/address/${contractAddress}#code`} icon={etherscanUrl} />
        ) : (
          ''
        )}
        <Link title="Code" href="https://github.com/guy-do-or-die/laf" icon={gitUrl} />
      </div>
    </div>
  )
}
