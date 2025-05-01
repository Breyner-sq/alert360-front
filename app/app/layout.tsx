import AppNavBar from "@/components/AppNavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-1 gap-8 w-full min-h-0">
            <AppNavBar />
            <div className="flex-1 pr-8 min-h-0 overflow-y-auto flex scrollbar-transparent-secondary flex-col items-center" style={{ maxHeight: 'calc(100vh - 64px)' }}>
                {children}
            </div>
        </div>

    );
}
