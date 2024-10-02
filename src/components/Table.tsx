"use client";
import { NobelType } from "@/types/nobel";
import Image from "next/image";
import CsvDownload from "react-csv-downloader";

interface Prop {
  data: NobelType[];
  columns: string[];
}

export default function Table({ data, columns }: Prop) {
  return (
    <table className="flex flex-col text-sm rounded-2xl w-full h-full overflow-hidden bg-white">
      <thead className="rounded-t-lg py-[10px] gap-4 px-4 grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr_1.5fr_2fr] text-center bg-[#283584] text-white">
        {columns.map((column, index) => (
          <tr key={index}>
            <th>{column}</th>
          </tr>
        ))}
      </thead>
      <tbody>
        {data.map((row_data, index) => (
          <tr
            key={index}
            className={`py-[12px] mx-4 gap-4 grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr_1.5fr_2fr] text-left ${index != 9 && "border-b-2"} border-[#F2F2F7]`}
          >
            <td>
              <Image
                src={row_data.image}
                width={50}
                height={50}
                alt={row_data.name}
              />
            </td>
            <td className="whitespace-normal break-words">{row_data.name}</td>
            <td className="whitespace-normal break-words">
              {row_data.category}
            </td>
            <td className="whitespace-normal break-words">{row_data.year}</td>
            <td className="whitespace-normal break-words">
              {row_data.born_date}
            </td>
            <td className="whitespace-normal break-words">
              {row_data.born_place}
            </td>
            <td className="whitespace-normal break-words max-h-[6.75rem] overflow-hidden text-ellipsis">
              <div className="line-clamp-4">{row_data.motivation}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
