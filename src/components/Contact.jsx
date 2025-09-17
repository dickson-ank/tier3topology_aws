// src/components/Contact.jsx
function Contact() {
  return (
    <section id="contact" className="bg-gray-100 py-12 mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-[#008080] mb-4">
          Get in Touch
        </h2>
        <p className="mb-6">
          Have questions or feedback? Reach out to me directly:
        </p>
        <a
          href="mailto:your-email@example.com"
          className="px-6 py-3 bg-[#CC7722] text-white rounded hover:bg-orange-600"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}

export default Contact;
