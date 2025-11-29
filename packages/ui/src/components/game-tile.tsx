export interface GameTileProps {
    title: string;
    amount: string;
    image: string;
}


export function GameTile({ title, amount, image }: GameTileProps) {
    return (
        <div className="w-[120px] flex-shrink-0">
            <img src={image} className="rounded-xl w-full h-[130px] object-cover" />
            <p className="text-white mt-2 text-sm font-semibold truncate">{title}</p>
            <p className="text-primary text-xs">{amount}</p>
        </div>
    );
}