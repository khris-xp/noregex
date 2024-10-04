import React from "react";
import { NobelType } from "@/types/nobel";
import ProfileCard from "@/components/ProfileCard";

interface Props {
  data: NobelType[];
}

const CardView: React.FC<Props> = ({ data }) => {
  return (
    <div className="rounded-2xl w-full h-full grid grid-cols-2 gap-4 lg:grid-cols-3 xl:gap-8">
      {data.map((ele, index) => (
        <ProfileCard key={index} data={ele} />
      ))}
    </div>
  );
};

export default CardView;
