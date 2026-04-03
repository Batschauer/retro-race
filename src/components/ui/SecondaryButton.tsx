type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export function SecondaryButton({ children, className = "", ...rest }: Props) {
  return (
    <button
      type="button"
      className={`btn-secondary focus-visible:ghost-outline ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
