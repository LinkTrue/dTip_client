interface ShareIconProps {
    onClick: () => void,
    iconClass: string,
    title: string,
    hoverColor: string
}

const ShareIcon = ({ onClick, iconClass, title, hoverColor }: ShareIconProps) => (
    <i
        title={title}
        onClick={onClick}
        className={`fa-brands ${iconClass} cursor-pointer text-2xl transition-transform hover:scale-110 hover:text-[${hoverColor}]`}
    />
);

export { ShareIcon }