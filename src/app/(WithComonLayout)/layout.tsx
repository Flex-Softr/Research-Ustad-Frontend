import ChatButton from "../../components/shared/ChatButton/ChatButton";
import Footer from "../../components/shared/footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";
import { TopBar } from "../../components/shared/TopBar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopBar />
      <Navbar></Navbar>
      <ChatButton></ChatButton>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
