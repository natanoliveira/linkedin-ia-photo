export function Header() {
    return (
        <header className="h-16 border-b">
            <div className="container mx-auto flex h-full items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Linkfotos AI</span>
                </div>

                <nav className="flex items-center gap-6 text-sm text-muted-foreground">
                    <button className="hover:text-foreground transition-colors">
                        Como funciona
                    </button>
                    <button className="hover:text-foreground transition-colors">
                        Exemplos
                    </button>
                </nav>
            </div>
        </header>
    );
}
