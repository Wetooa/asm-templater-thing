import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  display?: string;
  value: string;
}

export default function Input({ name, display, onChange, value }: InputProps) {
  display = display ?? name;

  return (
    <div className="p-2">
      <label htmlFor="type" className="font-bold">
        Enter {display}:{" "}
      </label>
      <input
        value={value}
        className="border p-1 border-black rounded-lg"
        type="text"
        name={name}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
