import React from "react";
import { NobelType } from "@/types/nobel";
import ProfileCard from "@/components/ProfileCard";

interface Props {
  data: NobelType[];
}

const CardView: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((ele, index) => (
        <ProfileCard key={index} data={ele} />
      ))}
    </div>
  );
};

export default CardView;
