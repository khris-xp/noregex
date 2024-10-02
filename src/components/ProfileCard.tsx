import { NobelType } from "@/types/nobel";
import Image from "next/image";
import React from "react";

interface Props {
  data: NobelType;
}

const ProfileCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <Image
          className="w-full h-96 object-cover"
          width={1000}
          height={1000}
          src={data.image}
          alt={data.name}
        />
        <div className="absolute top-2 right-2 w-10 h-10">
          <Image
            src={`/${data.category.toLowerCase()}.svg`}
            width={100}
            height={100}
            alt="category-icon"
          />
        </div>
      </div>
      <div className="p-6 font-normal">
        <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
        <p className="text-gray-900">
          <strong className=" font-medium">Category:</strong> {data.category}
        </p>
        <p className="text-gray-900">
          <strong className="font-medium">Year:</strong> {data.year}
        </p>
        <p className="text-gray-900">
          <strong className="font-semibold">Birthdate:</strong> {data.born_date}
        </p>
        <p className="text-gray-900">
          <strong className="font-semibold">Birthplace:</strong>{" "}
          {data.born_place}
        </p>
        <p className="text-gray-900 mt-4">“{data.motivation}”</p>
      </div>
    </div>
  );
};

export default ProfileCard;
