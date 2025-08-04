import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAccount, chain } from '@/wallet';
import { 
  useReadLafConfig,
  lafAddress,
  lafAbi
} from '@/contracts';
import { formatUnits } from 'viem';
import { useReadContracts } from 'wagmi';
import { Link } from 'wouter';
import { Search, Package, Heart, TrendingUp, Users, DollarSign, MapPin } from 'lucide-react';
import ItemsMap from '@/components/ItemsMap';
import { useState, useEffect } from 'react';
import { getLostItems } from '@/services/graphService';

// Reusable StatCard component
function StatCard({ title, icon: Icon, value, description, isLoading, color = "text-blue-600" }) {
  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

// Feature card component
function FeatureCard({ title, description, icon: Icon, color = "text-blue-600" }) {
  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl h-full">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Icon className={`h-8 w-8 ${color}`} />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Landing() {
  const { address } = useAccount();
  const [recentLostItems, setRecentLostItems] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(null);

  // Get LAF configuration
  const { data: lafConfig } = useReadLafConfig();

  // Contract configuration for multicall
  const contractsConfig = [
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'registeredCount',
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'lostCount',
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'foundCount',
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'returnedCount',
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'rewardsDistributed',
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'charityFeesDistributed',
    },
    {
      address: lafAddress[chain.id],
      abi: lafAbi,
      functionName: 'charitiesCount',
    },
  ];

  const { data: platformStats, isLoading: statsLoading, error: statsError } = useReadContracts({
    contracts: contractsConfig,
  });

  // Debug platform stats
  console.log('Landing Platform Stats Debug:', {
    contractsConfig,
    platformStats,
    statsLoading,
    statsError,
    lafAddress: lafAddress[chain.id],
    chainId: chain.id
  });

  // Extract results from multicall
  const registeredCount = platformStats?.[0]?.result;
  const lostCount = platformStats?.[1]?.result;
  const foundCount = platformStats?.[2]?.result;
  const returnedCount = platformStats?.[3]?.result;
  const rewardsDistributed = platformStats?.[4]?.result;
  const charityFeesDistributed = platformStats?.[5]?.result;
  const charitiesCount = platformStats?.[6]?.result;

  // Debug extracted values
  console.log('Extracted Platform Values:', {
    registeredCount,
    lostCount,
    foundCount,
    returnedCount,
    rewardsDistributed,
    charityFeesDistributed,
    charitiesCount
  });

  // Calculate success rate
  const successRate = foundCount && lostCount ? 
    ((Number(foundCount) / Number(lostCount)) * 100).toFixed(1) : '0';

  // Format reward token amounts (assuming USDC with 6 decimals)
  const rewardTokenDecimals = lafConfig?.rewardTokenDecimals || 6;
  const totalRewards = rewardsDistributed ? 
    formatUnits(rewardsDistributed, rewardTokenDecimals) : '0';
  const totalCharityFees = charityFeesDistributed ? 
    formatUnits(charityFeesDistributed, rewardTokenDecimals) : '0';

  // Load recent lost items for map display
  useEffect(() => {
    const loadRecentLostItems = async () => {
      try {
        setMapLoading(true);
        setMapError(null);
        const lostItems = await getLostItems();
        
        // Get the 10 most recent lost items with valid geo data
        const itemsWithGeo = lostItems
          .filter(item => item.geo && item.geo.trim() !== '')
          .slice(0, 10)
          .map(item => ({
            ...item,
            status: 'lost'
          }));
        
        setRecentLostItems(itemsWithGeo);
      } catch (error) {
        console.error('Failed to load recent lost items:', error);
        setMapError('Failed to load recent lost items');
      } finally {
        setMapLoading(false);
      }
    };

    loadRecentLostItems();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Lost & Found Protocol
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          A decentralized lost and found system powered by blockchain technology. 
          Register your items, report them lost, and get rewarded for helping others find their belongings.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/register">
            <Button size="lg" className="rounded-lg shadow-md">
              Register Item
            </Button>
          </Link>
          <Link href="/items">
            <Button size="lg" variant="outline" className="rounded-lg">
              Browse Items
            </Button>
          </Link>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Items Registered"
              icon={Package}
              value={registeredCount ? formatUnits(registeredCount, 0) : '0'}
              description="Total items in the system"
              isLoading={statsLoading}
              color="text-blue-600"
            />
            <StatCard
              title="Items Lost"
              icon={Search}
              value={lostCount ? formatUnits(lostCount, 0) : '0'}
              description="Currently missing items"
              isLoading={statsLoading}
              color="text-orange-600"
            />
            <StatCard
              title="Items Found"
              icon={Heart}
              value={foundCount ? formatUnits(foundCount, 0) : '0'}
              description="Successfully located items"
              isLoading={statsLoading}
              color="text-green-600"
            />
            <StatCard
              title="Items Returned"
              icon={TrendingUp}
              value={returnedCount ? formatUnits(returnedCount, 0) : '0'}
              description="Completed reunions"
              isLoading={statsLoading}
              color="text-purple-600"
            />
          </div>
        </div>

      {/* Impact Statistics */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Community Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Success Rate"
              icon={TrendingUp}
              value={`${successRate}%`}
              description="Items found vs lost"
              isLoading={statsLoading}
              color="text-green-600"
            />
            <StatCard
              title="Rewards Distributed"
              icon={DollarSign}
              value={`$${totalRewards}`}
              description="Total finder rewards paid"
              isLoading={statsLoading}
              color="text-blue-600"
            />
            <StatCard
              title="Charity Donations"
              icon={Heart}
              value={`$${totalCharityFees}`}
              description={`To ${charitiesCount ? formatUnits(charitiesCount, 0) : '0'} charities`}
              isLoading={statsLoading}
              color="text-red-600"
            />
          </div>
        </div>

      {/* Recent Lost Items Map */}
      <div className="mb-12">
        <ItemsMap
          items={recentLostItems}
          center={[40.7128, -74.0060]} // Default center
          zoom={8}
          height="h-80"
          loading={mapLoading}
          error={mapError}
          interactive={true}
          showZoomControl={true}
          fitBounds={true}
          title="Recent Lost Items - Help Find Them!"
          emptyMessage="No recent lost items with location data found"
          rewardTokenDecimals={rewardTokenDecimals}
        />
        
        <div className="text-center mt-4">
          <Link href="/hunt">
            <Button variant="outline" className="rounded-lg shadow-md">
              <MapPin className="h-4 w-4 mr-2" />
              Explore All Items on Map
            </Button>
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="1. Register"
              description="Create a unique QR code or NFC tag for your valuable items. Print and attach them for future identification."
              icon={Package}
              color="text-blue-600"
            />
            <FeatureCard
              title="2. Report Lost"
              description="If you lose an item, report it on the platform with a reward for the finder. The community gets notified."
              icon={Search}
              color="text-orange-600"
            />
            <FeatureCard
              title="3. Get Rewarded"
              description="Find someone's lost item? Scan the QR code and claim your reward when you return it to the owner."
              icon={Heart}
              color="text-green-600"
            />
          </div>
        </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Why Choose LAF Protocol?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              title="Decentralized & Trustless"
              description="Built on blockchain technology, ensuring transparency and eliminating the need for intermediaries."
              icon={TrendingUp}
              color="text-purple-600"
            />
            <FeatureCard
              title="Instant Rewards"
              description="Finders receive immediate cryptocurrency rewards when items are successfully returned to owners."
              icon={DollarSign}
              color="text-green-600"
            />
            <FeatureCard
              title="Global Community"
              description="Connect with a worldwide network of honest people committed to helping each other."
              icon={Users}
              color="text-blue-600"
            />
            <FeatureCard
              title="Charity Integration"
              description="A portion of platform fees automatically goes to verified charities, creating positive social impact."
              icon={Heart}
              color="text-red-600"
            />
          </div>
        </div>

      {/* Call to Action */}
      <div className="text-center bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of users who trust LAF Protocol to keep their valuables safe.
        </p>
        {address ? (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="rounded-lg shadow-md">
                Register Your First Item
              </Button>
            </Link>
            <Link href="/items">
              <Button size="lg" variant="outline" className="rounded-lg">
                Help Find Lost Items
              </Button>
            </Link>
          </div>
        ) : (
          <p className="text-gray-600">
            Connect your wallet to start using LAF Protocol
          </p>
        )}
      </div>
    </div>
  );
}