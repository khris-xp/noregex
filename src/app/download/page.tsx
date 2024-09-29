"use client";
import CsvDownload from "react-csv-downloader";
const table_head = [
  {
    id: "name",
    displayName: "Name",
  },
  {
    id: "position",
    displayName: "Position",
  },
  {
    id: "task",
    displayName: "Task",
  },
];

const working_status = [
  {
    name: "khris_xp",
    position: "super ultra senior dev",
    task: "setting up",
  },
  {
    name: "janipang",
    position: "front-dev",
    task: "downloading",
  },
  {
    name: "hom",
    position: "devOps",
    task: "deploying",
  },
  {
    name: "rainbow",
    position: "UX/UI",
    task: "designing",
  },
  {
    name: "rew",
    position: "algorithm",
    task: "thinking",
  },
  {
    name: "menu",
    position: "presentor",
    task: "reading script",
  }
];
export default function DownLoad() {
  return (
    <main className="flex flex-col justify-between min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* <header className="bg-blue-700 w-full p-6">This is Header</header> */}
      <div className="flex flex-col gap-6 h-full w-full justify-center items-end p-8 pb-20 sm:p-20">
        <CsvDownload
          filename="noble_person"
          columns={table_head}
          datas={working_status}
          className="p-4 bg-blue-600 rounded-lg shadow-md"
        >
          Download Here!
        </CsvDownload>
        <table className="flex flex-col gap-2 rounded-2xl w-[140vw] md:w-[80vw]">
          <tr className="rounded-lg shadow-md py-4 px-2 grid grid-cols-[1.5fr_2fr_1fr_1fr_2fr_1fr_2.5fr] text-center bg-blue-400 text-white">
            {table_head.map((column) => (
              <th key={column.id}>{column.displayName}</th>
            ))}
          </tr>
          {working_status.map((row_data) => (
            <tr className="rounded-lg shadow-md py-6 px-2 grid grid-cols-[1.5fr_2fr_1fr_1fr_2fr_1fr_2.5fr] text-center bg-white">
              {Object.keys(row_data).map((key) => (
                <td className="whitespace-normal break-words">
                  {row_data[key as keyof typeof row_data]}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
      <footer className="bg-blue-700 w-full p-6"> This is Footer</footer>
    </main>
  );
}
