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
    name: "mai_kitty",
    position: "front-dev",
    task: "fetching",
  },
];
export default function DownLoad() {
  return (
    <div className="flex flex-col justify-between min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="bg-blue-700 w-full p-6">This is Header</header>
      <main className="flex h-full w-full justify-center items-center p-8 pb-20 sm:p-20">
        <CsvDownload
          filename="noble_person"
          columns={table_head}
          datas={working_status}
          className="p-4 bg-blue-600 rounded-lg shadow-md"
        >
          Download Here!
        </CsvDownload>
      </main>
      <footer className="bg-blue-700 w-full p-6"> This is Footer</footer>
    </div>
  );
}
