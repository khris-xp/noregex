import React from "react";

interface ProfileCardProps {
  name: string;
  image: string;
  category: string;
  year: string;
  birthdate: string;
  birth_place: string;
  quote: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  image,
  category,
  year,
  birthdate,
  birth_place,
  quote,
}) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <img className="w-full h-64 object-cover" src={image} alt={name} />
      <div className="p-6">
        <h2 className="outfit text-gray-700 font-extrabold text-xl mb-2">
          {name}
        </h2>
        <p className="text-gray-700 text-base">
          <strong>Category:</strong> {category}
        </p>
        <p className="outfit text-gray-700 text-base">
          <strong>Year:</strong> {year}
        </p>
        <p className="outfit text-gray-700 text-base">
          <strong>Birthdate:</strong> {birthdate}
        </p>
        <p className="outfit text-gray-700 text-base">
          <strong>Birthplace:</strong> {birth_place}
        </p>
        <p className="kanit-thin text-gray-700 text-base italic mt-4">
          “{quote}”
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
