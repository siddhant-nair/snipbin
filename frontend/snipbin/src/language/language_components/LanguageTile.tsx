export default function LanguageTile({ languageName }: { languageName: string }) {
    return (
        <a href={languageName} className="block w-28">
            <div className="size-full">
                <img src={`/api/v1/media/assets/${languageName}.svg`}
                    className="w-full h-full"
                    alt="" />
            </div>
        </a>
    )
}