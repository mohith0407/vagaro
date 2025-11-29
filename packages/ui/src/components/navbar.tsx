export interface NavbarProps {
    balance?: number;
    avatar?: string;
    logo?: string;
}


export function Navbar({ balance = 0, avatar = "/avatar.png", logo = "/logo.svg" }: NavbarProps) {
    return (
        <div className="w-full h-[60px] flex items-center justify-between px-4 bg-dark">
            <img src={logo} alt="logo" className="h-7" />
            <div className="flex items-center gap-3">
                <div className="bg-dark-card px-3 py-1 rounded-full text-primary font-semibold">
                    ${balance.toLocaleString()}
                </div>
                <img src={avatar} className="h-8 w-8 rounded-full" />
            </div>
        </div>
    );
}