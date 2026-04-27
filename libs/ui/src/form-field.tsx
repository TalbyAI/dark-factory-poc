import type { ReactNode } from 'react'
import { useId } from 'react'
import { Label } from '#components/ui/label'
import { cn } from './cn'

export interface FormFieldControlProps {
	readonly id: string
	readonly disabled?: boolean
	readonly 'aria-labelledby'?: string
	readonly 'aria-describedby'?: string
	readonly 'aria-invalid'?: true
}

export interface FormFieldProps {
	readonly label?: ReactNode
	readonly description?: ReactNode
	readonly error?: ReactNode
	readonly disabled?: boolean
	readonly className?: string
	readonly controlClassName?: string
	readonly children: ReactNode | ((props: FormFieldControlProps) => ReactNode)
	readonly id?: string
}

export function FormField({
	label,
	description,
	error,
	disabled = false,
	className,
	controlClassName,
	children,
	id,
}: FormFieldProps) {
	const generatedId = useId()
	const controlId = id ?? generatedId
	const labelId = `${controlId}-label`
	const descriptionId = description ? `${controlId}-description` : undefined
	const errorId = error ? `${controlId}-error` : undefined
	const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined
	const controlProps: FormFieldControlProps = {
		id: controlId,
		disabled,
		'aria-labelledby': label ? labelId : undefined,
		'aria-describedby': describedBy,
		'aria-invalid': error ? true : undefined,
	}

	return (
		<div className={cn('grid gap-2', disabled && 'opacity-70', className)}>
			{label ? (
				<Label
					id={labelId}
					htmlFor={controlId}
					className={cn(disabled && 'cursor-not-allowed', error && 'text-destructive')}
				>
					{label}
				</Label>
			) : null}

			<div className={cn('grid gap-2', controlClassName)}>
				{typeof children === 'function' ? children(controlProps) : children}
				{description ? (
					<p id={descriptionId} className="text-sm leading-6 text-muted-foreground">
						{description}
					</p>
				) : null}
				{error ? (
					<p id={errorId} role="alert" className="text-sm font-medium leading-6 text-destructive">
						{error}
					</p>
				) : null}
			</div>
		</div>
	)
}