import React, { SelectHTMLAttributes } from 'react';
import { capitalizeFirstLetter } from '../utils';

interface Props {
   // defaultValue?: string;
   options: string[];
   onChangeHandler(value: string): void;
}

export const Selector: React.FC<Props & SelectHTMLAttributes<HTMLSelectElement>> = React.memo(
   ({ options, onChangeHandler, ...props }) => {
      return (
         <select
            {...props}
            defaultValue={props.defaultValue ?? options[0]}
            onChange={(e) => onChangeHandler(e.target.value)}
            className="px-4 py-2 focus:outline-none text-black font-bold rounded-md"
         >
            {options.map((option) => (
               <option key={option} value={option}>
                  {capitalizeFirstLetter(option)}
               </option>
            ))}
         </select>
      );
   },
);
