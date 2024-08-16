
import { Spinner } from "flowbite-react";
export default function Loader() {
  return (
    <div className="flex justify-center items-center gap-2 w-full h-full">
      <Spinner aria-label="Extra large spinner example" size="xl" color="warning" className="w-[100px]"/>
    </div>
  );
}
