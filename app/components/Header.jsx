import Connection from './Connection'

export default function Header() {
    return (
        <header className="w-full">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold">Laf is... Lost and Found</h1>
                </div>
                <div className="flex-shrink-0">
                    <Connection />
                </div>
            </div>
        </header>
    )
}