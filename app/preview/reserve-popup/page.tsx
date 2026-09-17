import { Navbar } from "@/components/site/navbar";
import { ReservePopup } from "@/components/site/reserve-popup";

export default function ReservePopupPreview() {
  return (
    <div className="-m-10 min-h-screen self-stretch bg-[#f7fbef]">
      <Navbar />
      <ReservePopup defaultOpen />
    </div>
  );
}
