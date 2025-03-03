function Button({
	children,
	type = "",
	isLoading,
	onClick,
	textColor,
	bgColor = "pink",
	paddingSize = 5,
}) {
	const textClass = `${textColor}`;
	const paddingClass = `p-${paddingSize}`;
	return (
		<button
			type={type}
			disabled={isLoading}
			onClick={onClick}
			style={{ backgroundColor: bgColor }}
			className={`${textClass} ${paddingClass}`}
		>
			{children}
		</button>
	);
}

export default Button;
