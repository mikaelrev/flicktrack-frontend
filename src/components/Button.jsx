function Button({
	children,
	type = "button",
	isLoading,
	onClick,
	borderRadius = "rounded-sm",
	borderWidth,
	borderColor,
	borderStyle,
	bgColor = "bg-gray-600",
	textColor = "text-white",
	py = "py-2",
	px = "px-3",
	cursor = "cursor-pointer",
	hover = "hover:bg-gray-500",
}) {
	return (
		<button
			type={type}
			disabled={isLoading}
			onClick={onClick}
			className={`${textColor} ${py} ${px} ${borderRadius} ${borderWidth} ${borderColor} border-${borderStyle} ${cursor} ${bgColor} ${hover}`}
		>
			{children}
		</button>
	);
}

export default Button;
