
export const FullPage: React.FC<React.PropsWithChildren> =  ({
    children
}) => {
    return (
        <div className="flex flex-col h-[calc(100vh - 64px)] py-6">
            {children}
        </div>
    )
}