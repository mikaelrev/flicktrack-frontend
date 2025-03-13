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
	py = 5,
	px = 5,
	cursor = "cursor-pointer",
	hover = "hover:bg-gray-500",
}) {
	return (
		<button
			type={type}
			disabled={isLoading}
			onClick={onClick}
			className={`${textColor} py-${py} px-${px} ${borderRadius} ${borderWidth} ${borderColor} border-${borderStyle} ${cursor} ${bgColor} ${hover}`}
		>
			{children}
		</button>
	);
}

export default Button;
