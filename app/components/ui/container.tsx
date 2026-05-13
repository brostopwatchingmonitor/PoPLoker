import * as React from 'react';
import { clsx } from 'clsx';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export { Container };