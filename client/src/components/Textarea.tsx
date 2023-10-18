import { DEFAULT_PARAMS } from "@/utils/constants";
import { ChangeEvent } from "react";

interface TextareaProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  display?: string;
  value: string;
}

export default function Textarea({
  display,
  onChange,
  name,
  value,
}: TextareaProps) {
  display = display ?? name;

  return (
    <div className="p-2 flex flex-col">
      <label htmlFor="type" className="">
        Enter {display}:{" "}
      </label>
      <textarea
        value={value}
        className="border p-1 border-black rounded-md"
        name={name}
        placeholder={`ex. ${(DEFAULT_PARAMS as any)[name] || "..."}`}
        onChange={(e) => onChange(e)}
      ></textarea>
    </div>
  );
}
