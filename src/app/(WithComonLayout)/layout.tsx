import ChatButton from "@/components/shared/ChatButton/ChatButton";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
  <Navbar></Navbar>
  <ChatButton ></ChatButton>
      <main className="min-h-screen">{children}</main>
    <Footer/>
    </>
  );
};

export default CommonLayout;
