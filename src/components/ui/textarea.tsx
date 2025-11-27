import * as React from "react"
import { cn } from "../../lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[100px] w-full rounded-xl border border-white/30 bg-white/70 backdrop-blur-xl text-slate-950 px-4 py-3 text-sm font-medium ring-offset-white placeholder:text-slate-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30 focus-visible:border-blue-400/50 focus-visible:bg-white/90 focus-visible:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:bg-white/10 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:bg-white/20 resize-none",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
