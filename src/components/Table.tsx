"use client";
import { NobelType } from "@/types/nobel";
import CsvDownload from "react-csv-downloader";

interface Prop {
  data: NobelType[];
  columns: string[];
}

export default function Table({ data, columns }: Prop) {
  return (
    <table className="flex flex-col rounded-2xl w-full min-w-[650px] h-full overflow-x-scroll bg-white">
      <tr className="rounded-t-lg py-[10px] gap-4 px-4 grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr_1.5fr_2fr] text-left bg-[#283584] text-white">
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
      {data.map((row_data, index) => (
        <tr
          key={index}
          className={`py-[12px] mx-4 gap-4 grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr_1.5fr_2fr] text-left ${index != 9 && "border-b-2"} border-[#F2F2F7]`}
        >
          <td>
            <img src={row_data.image} />
          </td>
          <td className="whitespace-normal break-words">{row_data.name}</td>
          <td className="whitespace-normal break-words">{row_data.category}</td>
          <td className="whitespace-normal break-words">{row_data.year}</td>
          <td className="whitespace-normal break-words">
            {row_data.birth_year}
          </td>
          <td className="whitespace-normal break-words">
            {row_data.birth_country}
          </td>
          <td className="whitespace-normal break-words max-h-[6.75rem] overflow-hidden text-ellipsis">
            <div className="line-clamp-4">{row_data.quote}</div>
          </td>
        </tr>
      ))}
    </table>
  );
}

{
  /* <CsvDownload
filename="noble_person"
columns={header}
datas={data}
className="p-4 bg-blue-600 rounded-lg shadow-md"
>
Download Here!
</CsvDownload> */
}
