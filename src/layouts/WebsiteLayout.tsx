import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar";
import { Outlet } from "react-router";

export default function WebsiteLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
