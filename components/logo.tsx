import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg' },
    md: { icon: 'w-10 h-10', text: 'text-xl' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl' },
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('relative', sizes[size].icon)}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* House shape */}
          <path
            d="M24 6L4 22H10V40H38V22H44L24 6Z"
            className="fill-primary"
          />
          {/* Location pin */}
          <circle cx="24" cy="24" r="6" className="fill-primary-foreground" />
          <circle cx="24" cy="24" r="3" className="fill-primary" />
          {/* Hands forming heart shape at bottom */}
          <path
            d="M16 32C16 32 20 36 24 38C28 36 32 32 32 32"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="stroke-primary-foreground"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={cn('font-bold tracking-tight text-foreground', sizes[size].text)}>
            Neighborhood
          </span>
          <span className={cn('font-medium text-primary -mt-1', size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg')}>
            Harmony
          </span>
        </div>
      )}
    </div>
  )
}
