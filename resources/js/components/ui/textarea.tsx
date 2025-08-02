import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Add any custom props you might need in the future
  variant?: 'default' | 'ghost';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          variant === 'ghost' ? 'border-transparent' : ''
        } ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };