
export default function Footer() {
    return (
        <footer className="w-full py-8 mt-auto bg-white border-t-4 border-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <a href="https://github.com/guy-do-or-die/laf" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <span className="text-black font-bold uppercase tracking-wide">Laf is... Lost and Found</span>
                        </a>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-black text-sm font-medium">
                            Built with ❤️ at EthGlobal Cannes 2025
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}