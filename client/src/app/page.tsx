"use client";

import Input from "@/components/Input";
import { AiOutlineCopy } from "react-icons/ai";
import {
  DEFAAULT_PARAMS,
  EMPTY_PARAMS,
  NUMBER_OF_ESSENTIAL_DATA,
} from "@/utils/constants";
import { ChangeEvent, useState } from "react";
import { generateCode } from "@/utils/func";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [data, setData] = useState<DataProps>(EMPTY_PARAMS);

  const handleSubmit = () => {
    setGeneratedCode(generateCode(data));
  };

  const handleGenerateDefaultParameters = () => {
    setData(DEFAAULT_PARAMS);
  };

  const clearParameters = () => {
    setData(EMPTY_PARAMS);
    setGeneratedCode("");
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <main className="">
      <div className="flex flex-col justify-center items-center">
        <Input name="type" onChange={handleOnChange} value={data.type} />
        <Input name="label" onChange={handleOnChange} value={data.label} />
        <Input
          name="shortenedLabel"
          display="shortened label"
          onChange={handleOnChange}
          value={data.shortenedLabel}
        />
        {[...Array(NUMBER_OF_ESSENTIAL_DATA)].map((_, i) => {
          return (
            <Input
              name={`essentialData${i + 1}`}
              display={`essential data ${i + 1}`}
              key={_}
              onChange={handleOnChange}
              value={(data as any)[`essentialData${i + 1}`]}
            />
          );
        })}

        <div className="flex gap-2">
          <button
            onClick={handleGenerateDefaultParameters}
            type="button"
            className="p-2 bg-yellow-200 rounded-lg"
          >
            Generate Default Parameters
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="p-2 bg-green-200 rounded-lg"
          >
            Generate Code
          </button>
          <button
            onClick={clearParameters}
            type="button"
            className="p-2 bg-red-200 rounded-lg"
          >
            Clear Parameters
          </button>
        </div>
      </div>

      <section className="p-5 bg-gray-500 h-screen">
        <button
          className="absolute right-1 text-2xl"
          onClick={() => {
            navigator.clipboard.writeText(generatedCode);
          }}
        >
          <AiOutlineCopy />
        </button>
        <div className="w-full h-full bg-slate-200 max-w-full">
          {generatedCode}
        </div>
      </section>
    </main>
  );
}
