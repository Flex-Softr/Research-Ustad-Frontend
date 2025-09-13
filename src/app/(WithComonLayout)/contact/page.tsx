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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.129051983705!2d-81.77615672435219!3d32.415701073816706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fa473206d2e165%3A0xad1ab923707937b6!2s100%20Bermuda%20Run%20Rd%2C%20Statesboro%2C%20GA%2030458%2C%20USA!5e0!3m2!1sen!2sbd!4v1757784995460!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
        <p className="text-center text-gray-600 mt-4 text-xl">
          Available for remote work worldwide.
        </p>
      </section>
    </div>
  );
};

export default page;
