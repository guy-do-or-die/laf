
export default function Content({ children }) {
    return (
        <main className="flex-grow py-8 px-4">
            <div className="container mx-auto">
                {children}
            </div>
        </main>
    )
}