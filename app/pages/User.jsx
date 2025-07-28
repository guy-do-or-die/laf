import { useParams } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAccount, chain } from '@/wallet';
import TxButton from '@/components/TxButton';
import { 
  useReadLafBalanceOf,
  useReadLafTrust,
  useWriteLafThumbUp,
  useWriteLafThumbDown,
  useSimulateLafThumbUp,
  useSimulateLafThumbDown,
  lafAddress,
  lafAbi
} from '@/contracts';
import { formatUnits } from 'viem';
import { useReadContracts } from 'wagmi';

// Reusable StatCard component
function StatCard({ title, emoji, value, description, isLoading }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-lg">{emoji}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function User() {
  const { address: userAddress } = useParams();
  const { address: currentUserAddress } = useAccount();

  // Debug chain and contract info
  console.log('User Profile Debug:', {
    chainId: chain.id,
    chainName: chain.name,
    lafAddressObject: lafAddress,
    lafAddressResolved: lafAddress[chain.id],
    lafAddressType: typeof lafAddress[chain.id],
    profileAddress: userAddress,
    currentUserAddress
  });

  // Check if viewing own profile
  const isOwnProfile = currentUserAddress && userAddress && 
    currentUserAddress.toLowerCase() === userAddress.toLowerCase();

  // Multicall for all user statistics
  const contractsConfig = [
    // Commemorative token
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 0], // LAF is... commemorative token
    },
    // LAF Token balances for different states
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 1], // Registered tokens
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 2], // Lost tokens
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 3], // Found tokens
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 4], // Returned tokens
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 5], // Delegated tokens
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 6], // Supported tokens
    },
    // Trust score
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'trust',
      args: [userAddress],
    },
    // Thumb up count (assuming token ID 7)
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 7], // Thumb up tokens received
    },
    // Thumb down count (assuming token ID 8)
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'balanceOf',
      args: [userAddress, 8], // Thumb down tokens received
    },
  ];

  console.log('Contract Config Debug:', {
    contractsConfig,
    userAddress,
    lafAddress,
    lafAddressResolved: lafAddress[chain.id],
    chainId: chain.id,
    actualContractAddress: contractsConfig[0].address
  });

  const { data: userStats, isLoading: statsLoading, error: statsError } = useReadContracts({
    contracts: contractsConfig,
  });

  // Extract results from multicall
  const commemorativeBalance = userStats?.[0]?.result;
  const registeredBalance = userStats?.[1]?.result;
  const lostBalance = userStats?.[2]?.result;
  const foundBalance = userStats?.[3]?.result;
  const returnedBalance = userStats?.[4]?.result;
  const delegatedBalance = userStats?.[5]?.result;
  const supportedBalance = userStats?.[6]?.result;
  const trustScore = userStats?.[7]?.result;
  const thumbUpCount = userStats?.[8]?.result;
  const thumbDownCount = userStats?.[9]?.result;

  // Debug multicall results
  // Stats configuration for rendering
  const statsConfig = [
    {
      key: 'registered',
      title: 'Registered',
      emoji: '😉',
      balance: registeredBalance,
      description: 'Items registered'
    },
    {
      key: 'lost',
      title: 'Lost',
      emoji: '😢',
      balance: lostBalance,
      description: 'Items lost'
    },
    {
      key: 'found',
      title: 'Found',
      emoji: '😎',
      balance: foundBalance,
      description: 'Items found'
    },
    {
      key: 'returned',
      title: 'Returned',
      emoji: '😇',
      balance: returnedBalance,
      description: 'Items returned'
    },
    {
      key: 'delegated',
      title: 'Delegated',
      emoji: '🧐',
      balance: delegatedBalance,
      description: 'Items delegated'
    },
    {
      key: 'supported',
      title: 'Supported',
      emoji: '🤗',
      balance: supportedBalance,
      description: 'Support tokens received'
    }
  ];

  console.log('Multicall Results Debug:', {
    statsLoading,
    statsError,
    userStats,
    rawBalances: {
      commemorative: commemorativeBalance?.toString(),
      registered: registeredBalance?.toString(),
      lost: lostBalance?.toString(),
      found: foundBalance?.toString(),
      returned: returnedBalance?.toString(),
      delegated: delegatedBalance?.toString(),
      supported: supportedBalance?.toString()
    },
    formattedBalances: {
      commemorative: commemorativeBalance ? formatUnits(commemorativeBalance, 0) : '0',
      registered: registeredBalance ? formatUnits(registeredBalance, 0) : '0',
      lost: lostBalance ? formatUnits(lostBalance, 0) : '0',
      found: foundBalance ? formatUnits(foundBalance, 0) : '0',
      returned: returnedBalance ? formatUnits(returnedBalance, 0) : '0',
      delegated: delegatedBalance ? formatUnits(delegatedBalance, 0) : '0',
      supported: supportedBalance ? formatUnits(supportedBalance, 0) : '0'
    },
    formattedWith0Decimals: {
      commemorative: commemorativeBalance ? formatUnits(commemorativeBalance, 0) : '0',
      registered: registeredBalance ? formatUnits(registeredBalance, 0) : '0',
      lost: lostBalance ? formatUnits(lostBalance, 0) : '0',
      found: foundBalance ? formatUnits(foundBalance, 0) : '0',
      returned: returnedBalance ? formatUnits(returnedBalance, 0) : '0',
      delegated: delegatedBalance ? formatUnits(delegatedBalance, 0) : '0',
      supported: supportedBalance ? formatUnits(supportedBalance, 0) : '0'
    }
  });

  // Thumb up/down functionality
  const { writeContract: thumbUp, isPending: thumbUpPending } = useWriteLafThumbUp();
  const { writeContract: thumbDown, isPending: thumbDownPending } = useWriteLafThumbDown();
  const { data: thumbUpSimulation } = useSimulateLafThumbUp({
    args: [userAddress],
  });
  const { data: thumbDownSimulation } = useSimulateLafThumbDown({
    args: [userAddress],
  });

  // For now, let's allow all logged-in users to vote and see what the actual contract error is
  const canVote = !!currentUserAddress && !isOwnProfile;

  // Check current user's voting power for display purposes
  const { data: currentUserVotingPower } = useReadLafBalanceOf({
    args: [currentUserAddress, 7], // Token ID 7 for display
    enabled: !!currentUserAddress,
  });

  // Debug voting
  console.log('Voting Debug:', {
    currentUserAddress,
    userAddress,
    canVote,
    isOwnProfile,
    currentUserVotingPower: currentUserVotingPower?.toString()
  });

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!userAddress) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <p className="text-red-500 mb-4">Invalid user address</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            {isOwnProfile ? 'Your Profile' : 'User Profile'}
          </h2>
          <p className="text-lg font-mono text-gray-600">
            {formatAddress(userAddress)}
          </p>
        </div>

        {/* Trust Score and Vote Counts */}
        <div className="text-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              Trust Score: {trustScore ? Number(trustScore).toString() : '0'}
            </div>
            <div className="flex justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4 text-green-600" />
                <span>{thumbUpCount ? formatUnits(thumbUpCount, 0) : '0'}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="w-4 h-4 text-red-600" />
                <span>{thumbDownCount ? formatUnits(thumbDownCount, 0) : '0'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumb Actions - Only show for other users */}
        {!isOwnProfile && currentUserAddress && (
          <div className="flex justify-center gap-2 mb-8">
            {canVote ? (
              <>
                <TxButton
                  simulateHook={useSimulateLafThumbUp}
                  writeHook={useWriteLafThumbUp}
                  params={{
                    args: [userAddress],
                    enabled: !!userAddress && canVote,
                  }}
                  text={<><ThumbsUp className="w-4 h-4 mr-2" />Thumb Up</>}
                  className="flex items-center"
                />
                <TxButton
                  simulateHook={useSimulateLafThumbDown}
                  writeHook={useWriteLafThumbDown}
                  params={{
                    args: [userAddress],
                    enabled: !!userAddress && canVote,
                  }}
                  text={<><ThumbsDown className="w-4 h-4 mr-2" />Thumb Down</>}
                  className="flex items-center"
                />
              </>
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-sm mb-2">You must be logged in to rate users</p>
              </div>
            )}
          </div>
        )}

        {/* Contract-based Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {statsConfig.map((stat) => (
            <StatCard
              key={stat.key}
              title={stat.title}
              emoji={stat.emoji}
              value={stat.balance ? formatUnits(stat.balance, 0) : '0'}
              description={stat.description}
              isLoading={statsLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
