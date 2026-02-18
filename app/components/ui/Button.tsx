import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-br from-brand to-brand-dark text-white hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5",
                outline: "border-2 border-brand text-brand bg-transparent hover:bg-brand/5",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-brand underline-offset-4 hover:underline",
                white: "bg-white text-brand hover:bg-gray-50 hover:shadow-lg",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 rounded-lg",
                lg: "h-14 px-8 text-base rounded-2xl",
                icon: "h-10 w-10",
            },
            fullWidth: {
                true: "w-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            fullWidth: false,
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
