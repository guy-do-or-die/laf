

import { Link } from 'wouter';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
    return (
        <div className="w-full retro-container min-h-screen py-4">
            {/* Hero Section */}
            <div className="text-center mb-8 retro-section">
                <h1 className="retro-title text-3xl md:text-4xl font-bold mb-3">
                    Lost Something?
                    <span className="block retro-accent">We'll Help You Find It</span>
                </h1>
                <p className="retro-text text-base md:text-lg mb-4 max-w-xl mx-auto px-4">
                    A decentralized platform for registering, reporting, and reuniting lost items with their owners. 
                    Powered by blockchain technology for trust and transparency.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8 px-4">
                <Card className="retro-card text-center hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="pt-4 pb-3 px-3">
                        <div className="w-10 h-10 retro-icon-bg rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 retro-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold retro-text mb-1">Secure Registration</h3>
                        <p className="retro-text-secondary text-xs">
                            Register your valuable items on the blockchain with cryptographic proof of ownership.
                        </p>
                    </CardContent>
                </Card>

                <Card className="retro-card text-center hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="pt-4 pb-3 px-3">
                        <div className="w-10 h-10 retro-icon-bg rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 retro-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold retro-text mb-1">Report Lost Items</h3>
                        <p className="retro-text-secondary text-xs">
                            Quickly report when an item goes missing and set rewards for finders.
                        </p>
                    </CardContent>
                </Card>

                <Card className="retro-card text-center hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="pt-4 pb-3 px-3">
                        <div className="w-10 h-10 retro-icon-bg rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 retro-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold retro-text mb-1">Reunite & Reward</h3>
                        <p className="retro-text-secondary text-xs">
                            Connect with finders and automatically distribute rewards when items are returned.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* How it Works */}
            <div className="retro-section px-4 pb-4">
                <h2 className="retro-title text-xl md:text-2xl font-bold mb-4 text-center">How It Works</h2>
                <div className="retro-card p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 retro-icon-bg rounded-full flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 retro-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h4 className="font-semibold retro-text mb-1 text-sm">Register</h4>
                            <p className="retro-text-secondary text-xs leading-tight">Add your valuable items to the blockchain registry</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 retro-icon-bg rounded-full flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 retro-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold retro-text mb-1 text-sm">Report</h4>
                            <p className="retro-text-secondary text-xs leading-tight">Mark items as lost when they go missing</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 retro-icon-bg rounded-full flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 retro-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold retro-text mb-1 text-sm">Find</h4>
                            <p className="retro-text-secondary text-xs leading-tight">Finders can report discovered items</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 retro-icon-bg rounded-full flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 retro-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold retro-text mb-1 text-sm">Reunite</h4>
                            <p className="retro-text-secondary text-xs leading-tight">Connect and return items to their owners</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}