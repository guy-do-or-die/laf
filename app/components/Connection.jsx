import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { formatUnits } from 'viem';
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogIn, LogOut, User, ChevronDown, ArrowDownToLine, ArrowUpFromLine, Key } from "lucide-react";
import { useFundWallet, usePrivy} from '@privy-io/react-auth';

import { useAccount, chain } from '../wallet';
import { useReadErc20BalanceOf } from '../contracts';
import { useMessagingConnection } from '../messaging/MessagingProvider';

import {notify} from './Notification';


export default function Connection() {
    const { loggedIn, login, logout, address, user, exportWallet } = useAccount();
    const { connect: connectMessaging, disconnect: disconnectMessaging } = useMessagingConnection();

    const [location, setLocation] = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const { fundWallet } = useFundWallet();
    const { data: balance, isSuccess } = useReadErc20BalanceOf({ args: [address] });

    useEffect(() => {
        if (loggedIn && location === '/') {
            notify('Connected', 'success', { id: "connected"});
            setLocation('/items');
            connectMessaging();
        }

        if (!loggedIn && location === '/items') {
            setLocation('/');
        }
    }, [loggedIn]);

    const handleLogin = () => {
        login();
        connectMessaging();
    };

    const handleLogout = () => {
        logout();
        disconnectMessaging();
        setLocation('/');
    };

    const deposit = async () => {
        try {
            await fundWallet(address);
        } catch (error) {
            console.error('Fund wallet error:', error);
        }
    };

    const formatAddress = (addr) => {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const formatBalance = (balance) => {
        return `$${parseFloat(formatUnits(balance, 6)).toFixed(2)}`;
    };

    const isSmartWallet = user?.linkedAccounts?.find((account) => account.type === 'smart_wallet');
    const embeddedWallet = user?.linkedAccounts?.find((account) => account.type === 'wallet');

    const handleExportPrivateKey = async () => {
        try {
            if (embeddedWallet) {
                console.log('🔑 Exporting private key for embedded wallet:', embeddedWallet.address);
                await exportWallet();
                setIsOpen(false);
            } else {
                notify('No embedded wallet found to export', 'error');
            }
        } catch (error) {
            console.error('❌ Export wallet error:', error);
            notify('Failed to export private key', 'error');
        }
    };

    if (!loggedIn) {
        return (
            <Button variant="default" onClick={handleLogin} className="text-sm px-3 py-2">
                <span className="hidden sm:inline">Connect</span>
                <LogIn className="sm:hidden h-4 w-4" />
            </Button>
        );
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="text-sm px-3 py-2 flex items-center gap-2 h-10 rounded-lg border-0 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline font-semibold text-green-600">
                    {isSuccess ? formatBalance(balance) : 'Loading...'}
                </span>
                <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-42" align="end">
                <DropdownMenuItem asChild>
                    <a 
                        href={`${chain?.blockExplorers?.default?.url}/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 cursor-pointer group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-sm group-hover:font-semibold">{formatAddress(address)}</span>
                        </div>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isSmartWallet && (
                    <>
                        <DropdownMenuItem 
                            onClick={() => { deposit(); setIsOpen(false); }}
                            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent/50 focus:bg-accent/70 cursor-pointer"
                        >
                            <ArrowDownToLine className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Deposit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={() => { notify('Withdrawal feature coming soon!', 'info'); setIsOpen(false); }}
                            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent/50 focus:bg-accent/70 cursor-pointer"
                        >
                            <ArrowUpFromLine className="h-4 w-4 text-amber-600" />
                            <span className="text-sm font-medium">Withdraw</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                {embeddedWallet && (
                    <>
                        <DropdownMenuItem 
                            onClick={handleExportPrivateKey}
                            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-yellow-50 focus:bg-yellow-100 cursor-pointer"
                        >
                            <Key className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium">Export Private Key</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-gray-50 focus:bg-gray-100 text-gray-600 hover:text-gray-700 cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Disconnect</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}