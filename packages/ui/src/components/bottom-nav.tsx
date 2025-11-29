export interface BottomTab {
    icon: string | React.ReactNode;
    label: string;
}


export interface BottomNavProps {
    tabs?: BottomTab[];
}


export function BottomNav({
    tabs = [
        { icon: "🏠", label: "Home" },
        { icon: "🎰", label: "Casino" },
        { icon: "🎥", label: "Live" },
        { icon: "💬", label: "Chat" },
        { icon: "👤", label: "Profile" },
    ],
}: BottomNavProps) {
    return (
        <div className="fixed bottom-0 left-0 w-full h-[72px] bg-dark-card flex justify-around items-center rounded-t-2xl shadow-card">
            {tabs.map((t) => (
                <div key={t.label} className="flex flex-col items-center text-gray-text text-sm">
                    <span className="text-xl">{t.icon}</span>
                    {t.label}
                </div>
            ))}
        </div>
    );
}