// import Image from "next/image";
import "./globals.css";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <ProfileCard
      name={"Anne L’Huillier"}
      category={"What"}
      year={"2024"}
      image={
        "https://media.licdn.com/dms/image/v2/D4E03AQH0ZXU-81B38Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689197139807?e=1733356800&v=beta&t=tDs12ECf9JAFDf5LucjsXYDwxOqDi_0VjezGX-p4Drc"
      }
      birth_place={"Somewhere, Thailand"}
      quote={"ไม้สุดหล่อ"}
      birthdate={"1 Januray 2004"}
    />
  );
}
