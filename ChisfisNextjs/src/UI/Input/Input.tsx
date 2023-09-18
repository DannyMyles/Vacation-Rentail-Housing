import { InputText } from "primereact/inputtext";
import React from "react";

interface Input {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
}

const Input = ({ onChange, type, name, id, placeholder, value }: Input) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className=" text-xs">
        {name}
      </label>
      <InputText
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full text-purple"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
