
export default function Content({ children }) {
    return (
        <main className="flex-grow flex flex-col items-center justify-center py-8 px-4">
            <div className="container mx-auto flex flex-col items-center text-center">
                {children}
            </div>
        </main>
    )
}