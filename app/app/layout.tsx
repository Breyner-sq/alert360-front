import AppNavBar from "@/components/AppNavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-1 h-full">
            <AppNavBar />
            {children}
        </div>

    );
}