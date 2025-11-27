import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'secondary';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950",
                    {
                        'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-[1.02] backdrop-blur-xl dark:from-blue-400 dark:to-blue-500': variant === 'default',
                        'border border-white/30 bg-white/60 backdrop-blur-xl text-slate-900 hover:bg-white/80 hover:shadow-lg dark:border-white/20 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20': variant === 'outline',
                        'bg-white/50 backdrop-blur-xl text-slate-900 hover:bg-white/70 hover:shadow-md dark:bg-white/10 dark:text-slate-50 dark:hover:bg-white/20': variant === 'secondary',
                        'text-slate-700 hover:bg-white/40 hover:backdrop-blur-xl hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-slate-50': variant === 'ghost',
                        'h-10 px-4 py-2': size === 'default',
                        'h-9 rounded-md px-3': size === 'sm',
                        'h-11 rounded-md px-8': size === 'lg',
                        'h-10 w-10': size === 'icon',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
