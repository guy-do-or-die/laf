
export default function Content({ children }) {
    return (
        <main className="flex-grow flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-4">
            <div className="w-full max-w-sm md:max-w-4xl lg:max-w-7xl mx-auto flex flex-col items-center text-center">
                {children}
            </div>
        </main>
    )
}