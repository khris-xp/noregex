import { fetchNobel } from "@/actions/nobelAction";
import HomeModules from "./modules/home";

export default async function Home() {
  const nobel = await fetchNobel();
  return <HomeModules nobel={nobel} />;
}
