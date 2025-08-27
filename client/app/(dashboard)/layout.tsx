import MainSection from "@/components/dashboard/MainSection";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import { SidebarContextProvider } from "@/contexts/useSidebar";

import Footer from "@/components/layouts/Footer"; // ✅ Import Footer
import Navbar from "@/components/common/Navbar";

export const metadata = {
  title: "Accident Detection System",
  description: "Quickly detect accidents and alert emergency services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarContextProvider>
      <main className="flex min-h-screen w-full flex-col justify-between bg-slate-100">
        {/* Header */}
        <Navbar/>

        {/* Main Section */}
        <MaxWidthContainer className="max-w-none px-0 md:px-0 flex-grow">
          <section className="flex min-h-screen  ">
            {/* Sidebar */}
            {/* <MobileSidebar /> */}

            {/* Main Content */}
            <MainSection>{children}</MainSection>
          </section>
        </MaxWidthContainer>

        {/* Footer */}
        <Footer />
      </main>
    </SidebarContextProvider>
  );
}
