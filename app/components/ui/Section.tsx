import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    containerClassName?: string;
    width?: "default" | "wide" | "full";
    spacing?: "default" | "sm" | "lg" | "none";
}

const Section = forwardRef<HTMLElement, SectionProps>(
    (
        {
            className,
            containerClassName,
            width = "default",
            spacing = "default",
            children,
            ...props
        },
        ref
    ) => {
        return (
            <section
                ref={ref}
                className={cn(
                    "relative",
                    {
                        "py-16 md:py-24": spacing === "default",
                        "py-8 md:py-12": spacing === "sm",
                        "py-24 md:py-32": spacing === "lg",
                        "py-0": spacing === "none",
                    },
                    className
                )}
                {...props}
            >
                <div
                    className={cn(
                        "mx-auto px-4 md:px-6 w-full",
                        {
                            "max-w-7xl": width === "default",
                            "max-w-[1400px]": width === "wide",
                            "": width === "full",
                        },
                        containerClassName
                    )}
                >
                    {children}
                </div>
            </section>
        );
    }
);
Section.displayName = "Section";

export { Section };
