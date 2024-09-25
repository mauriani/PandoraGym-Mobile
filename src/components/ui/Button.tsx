import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { cn } from '@utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'flex flex-row items-center justify-center rounded-[6px]',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
        ghost: 'bg-slate-700',
        link: 'text-primary underline-offset-4',
        outline: 'border border-primary bg-transparent',
      },
      size: {
        default: 'h-14',
        sm: 'h-14 px-2',
        lg: 'h-14 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const buttonTextVariants = cva('text-base font-roboto font-bold text-center', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      ghost: 'text-primary-foreground',
      link: 'text-primary-foreground underline',
      outline: 'text-primary',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label?: string // Tornar o label opcional
  labelClasses?: string
  loading?: boolean // Adiciona a propriedade loading
}

function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  loading = false, // Padrão como false
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading} // Desativa o botão se estiver carregando
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" /> // Exibe o indicador de carregamento
      ) : (
        <Text
          className={cn(
            buttonTextVariants({ variant, size, className: labelClasses }),
          )}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export { Button, buttonVariants, buttonTextVariants }
