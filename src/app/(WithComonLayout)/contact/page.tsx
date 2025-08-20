// import ContactUs from '@/components/module/home/ContactPage/ContactUs';
import ContactSection from "@/components/home/ContactSection";

const page = () => {
  return (
    <div>
      <ContactSection />
      <section className="max-w-7xl mx-auto py-10 px-6">
        <h3 className="text-brand-primary text-3xl md:text-4xl font-bold  mb-4">
          Location
        </h3>
        <div className="h-96 bg-muted rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223908687!2d90.25446891259788!3d23.780863188152252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1620734414401!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
        <p className="text-center text-gray-600 mt-4 text-xl">
          Based in Dhaka, Bangladesh. Available for remote work worldwide.
        </p>
      </section>
    </div>
  );
};

export default page;
