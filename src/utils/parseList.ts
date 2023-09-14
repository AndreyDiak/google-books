interface Options {
   inter?: string;
   ending?: string;
}

export const parseList = (list: string[] | null, options?: Options) => {
   if (!list) return [];
   return list.map((item, index, arr) =>
      index !== arr.length - 1 && options?.inter
         ? `${item}${options.inter}`
         : options?.ending
            ? `${item}${options.ending}`
            : item,
   );
};
