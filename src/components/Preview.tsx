export const Preview = ({ url }: { url: string }) => {
    return (
        <div className="h-full">
            <iframe
                src={url}
                width="100%"
                height="100%"
                title="PDF Preview"
                style={{ border: 'none' }}
            />
        </div>
    )
}