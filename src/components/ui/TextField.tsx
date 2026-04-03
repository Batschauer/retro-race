type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: boolean;
};

export function TextField({
  name,
  label,
  defaultValue,
  placeholder,
  type = "text",
  required,
  error,
}: Props) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="label-md mb-2 block text-secondary">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={`input-bottom ${error ? "input-bottom-error" : "focus:input-bottom-focus"}`}
      />
    </div>
  );
}
