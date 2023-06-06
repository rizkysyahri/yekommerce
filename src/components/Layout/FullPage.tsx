
export const FullPage: React.FC<React.PropsWithChildren> =  ({
    children
}) => {
    return (
        <div className="flex-col h-[calc(100vh - 64px)]">
            {children}
        </div>
    )
}