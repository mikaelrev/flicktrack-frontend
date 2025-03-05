function Button({
	children,
	type = "button",
	isLoading,
	onClick,
	borderRadius = "rounded-sm",
	borderWidth,
	borderColor,
	borderStyle,
	bgColor = "red",
	textColor = "text-white",
	py = 5,
	px = 5,
}) {
	return (
		<button
			type={type}
			disabled={isLoading}
			onClick={onClick}
			style={{ backgroundColor: bgColor }}
			className={`${textColor} py-${py} px-${px} ${borderRadius} ${borderWidth} ${borderColor} border-${borderStyle}`}
		>
			{children}
		</button>
	);
}

export default Button;
