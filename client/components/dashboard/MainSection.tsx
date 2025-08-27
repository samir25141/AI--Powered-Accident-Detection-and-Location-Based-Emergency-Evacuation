import React from "react";
import TopNavbar from "./TopNavbar";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
// import Footer from "../layouts/Footer"; // Uncomment if Footer needed
// import Navbar from "../common/Navbar"; // Commented out as per your structure

type Props = {
  children: React.ReactNode;
};

export default function MainSection({ children }: Props) {
  return (
    <div className="w-full max-w-[1350px] mx-auto">
      <TopNavbar />
      <MaxWidthContainer className="py-6">{children}</MaxWidthContainer>
      {/* <Footer /> */}
    </div>
  );
}
