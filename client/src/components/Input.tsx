import { DEFAULT_PARAMS } from "@/utils/constants";
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
    <div className="p-2 flex flex-col">
      <label htmlFor="type" className="">
        Enter {display}:{" "}
      </label>
      <input
        value={value}
        className="border p-1 border-black rounded-md"
        type="text"
        name={name}
        placeholder={`ex. ${(DEFAULT_PARAMS as any)[name] || "..."}`}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
