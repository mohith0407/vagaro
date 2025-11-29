export interface OfferCardProps {
    title: string;
    subtitle: string;
    cta: string;
    image: string;
}


export function OfferCard({ title, subtitle, image, cta }: OfferCardProps) {
    return (
        <div className="bg-dark-light rounded-2xl p-4 flex gap-4 items-center">
            <img src={image} className="h-20 w-20 rounded-xl object-cover" />
            <div className="flex-1">
                <h3 className="text-white text-lg font-semibold">{title}</h3>
                <p className="text-gray-text text-sm">{subtitle}</p>
                <button className="mt-2 bg-primary text-black px-4 py-2 rounded-full font-semibold">
                    {cta}
                </button>
            </div>
        </div>
    );
}