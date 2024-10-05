import ProfileCard from "@/components/ProfileCard";
import { NobelType } from "@/types/nobel";
import React from "react";

interface Props {
  data: NobelType[];
}

const CardView: React.FC<Props> = ({ data }) => {
  return (
    <div className="rounded-2xl w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {data.map((ele, index) => (
        <div className="flex justify-center" key={index}>
          <ProfileCard key={index} data={ele} />
        </div>
      ))}
    </div>
  );
};

export default CardView;
