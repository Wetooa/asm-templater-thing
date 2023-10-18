"use client";

import Input from "@/components/Input";
import { AiOutlineCopy } from "react-icons/ai";
import {
  DEFAULT_PARAMS,
  EMPTY_PARAMS,
  NUMBER_OF_ESSENTIAL_DATA,
  defaultToastConfig,
} from "@/utils/constants";
import { ChangeEvent, useState } from "react";
import { generateCode } from "@/utils/func";
import { toast } from "react-toastify";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [data, setData] = useState<DataProps>(EMPTY_PARAMS);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast("Copied ASM Code to clipboard", defaultToastConfig);
  };

  const handleSubmit = () => {
    setGeneratedCode(generateCode(data));
  };

  const handleGenerateDefaultParameters = () => {
    setData(DEFAULT_PARAMS);
  };

  const clearParameters = () => {
    setData(EMPTY_PARAMS);
    setGeneratedCode("");
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col justify-center p-6">
        <h2 className="font-bold text-4xl">Enter Parameters</h2>

        <div className="flex flex-wrap">
          <Input
            name="fullname"
            onChange={handleOnChange}
            value={data.fullname}
          />
          <Input name="type" onChange={handleOnChange} value={data.type} />
        </div>

        <div className="flex flex-wrap">
          <Input name="label" onChange={handleOnChange} value={data.label} />
          <Input
            name="shortenedLabel"
            display="shortened label"
            onChange={handleOnChange}
            value={data.shortenedLabel}
          />
        </div>

        <div className="flex flex-wrap">
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
        </div>

        <div className="flex gap-4 p-2">
          <button
            onClick={handleGenerateDefaultParameters}
            type="button"
            className="bg-yellow-200"
          >
            Generate Default Parameters
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className=" bg-green-200 "
          >
            Generate Code
          </button>
          <button
            onClick={clearParameters}
            type="button"
            className=" bg-red-200 "
          >
            Clear Parameters
          </button>
        </div>
      </div>

      <section className="p-5 bg-gray-500 min-h-screen h-full w-[95%] rounded-lg ">
        <p className="whitespace-pre-wrap break-words w-full h-full bg-slate-200 max-w-full rounded-lg p-2 relative">
          <button
            className="absolute text-2xl right-3 top-3"
            onClick={copyToClipboard}
          >
            <AiOutlineCopy />
          </button>
          {generatedCode}
        </p>
      </section>
    </main>
  );
}
