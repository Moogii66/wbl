interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  placeholder?: string;
}

export function Input({
  value,
  onChange,
  className,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 w-full rounded ${className}`}
    />
  );
}
