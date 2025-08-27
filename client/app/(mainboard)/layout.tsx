import Navbar from "@/components/common/Navbar"
import Footer from "@/components/layouts/Footer"
import Clientlayout from "@/app/(mainboard)/clientlayout";
export const metadata = {
  title: "Accident Detection System",
  description: "Quickly detect accidents and alert emergency services",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <main className="flex min-h-screen w-full flex-col justify-between">
       <Clientlayout>
      <Navbar />
      {children}
      
      <Footer />
      </Clientlayout>
    </main>
  )
}
