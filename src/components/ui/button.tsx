
import { type LucideIcon } from "lucide-react";
// import '../../tailwind.css';

export default function Button({
    text,
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    icon: Icon,
    disabled = false,
    loading = false,
    onClick,
}: {
    text: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    icon?: LucideIcon; // Lucide component for the icon
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
}) {
    const variantStyles: Record<string, string> = {
        primary: "btn btn-primary",
        secondary: "btn btn-secondary",
        outline: "btn btn-outline",
        ghost: "btn btn-ghost",
    };

    const sizeStyles: Record<string, string> = {
        sm: "btn-sm",
        md: "btn-md",
        lg: "btn-lg",
    };

    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            className={`
        inline-flex items-center justify-center rounded-md transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
        >
            {/* Show loading spinner if needed */}
            {loading ? (
                <span className="animate-spin mr-2 h-4 w-4  rounded-full" />
            ) : (
                Icon && (
                    <span className="mr-2 flex items-center">
                        <Icon size={16} className="block" />
                    </span>
                )
            )}
            <span>{text}</span>
        </button>
    );
}