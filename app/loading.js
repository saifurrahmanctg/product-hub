export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 animate-pulse"></div>
                    </div>
                </div>
                <p className="text-sm font-bold text-[#4c669a] animate-pulse">Loading ProductHub...</p>
            </div>
        </div>
    );
}
