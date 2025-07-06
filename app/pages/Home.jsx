

import { Link } from 'wouter';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Lost Something?
                    <span className="block text-blue-600">We'll Help You Find It</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    A decentralized platform for registering, reporting, and reuniting lost items with their owners. 
                    Powered by blockchain technology for trust and transparency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/register">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Register Item
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/items">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            View My Items
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="pt-8 pb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Registration</h3>
                        <p className="text-gray-600">
                            Register your valuable items on the blockchain with cryptographic proof of ownership.
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="pt-8 pb-6">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Report Lost Items</h3>
                        <p className="text-gray-600">
                            Quickly report when an item goes missing and set rewards for finders.
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="pt-8 pb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Reunite & Reward</h3>
                        <p className="text-gray-600">
                            Connect with finders and automatically distribute rewards when items are returned.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* How it Works */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                            1
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Register</h4>
                        <p className="text-gray-600 text-sm">Add your valuable items to the blockchain registry</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                            2
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Report</h4>
                        <p className="text-gray-600 text-sm">Mark items as lost when they go missing</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                            3
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Find</h4>
                        <p className="text-gray-600 text-sm">Finders can report discovered items</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                            4
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Reunite</h4>
                        <p className="text-gray-600 text-sm">Connect and return items to their owners</p>
                    </div>
                </div>
            </div>
        </div>
    )
}