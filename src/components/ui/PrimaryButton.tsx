type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export function PrimaryButton({ children, className = "", ...rest }: Props) {
  return (
    <button
      type="submit"
      className={`btn-primary w-full shadow-none transition-shadow hover:shadow-[4px_4px_0_rgba(240,242,245,0.4)] focus-visible:ghost-outline ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
