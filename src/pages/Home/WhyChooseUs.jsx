import SectionHeader from "@/shared/Section/SectionHeader";

const WhyChooseUs = () => {
  return (
    <div>
      {/* Section Heading */}
      <SectionHeader
        title_1st_slice={"WHY"}
        title_2nd_slice={"CHOOSE"}
        title_3rd_slice={"US"}
        subTitle={
          " At CareMatrix, we provide personalized, high-quality  healthcare with  advanced \n technology and 24/7 support. Trust our expert team for compassionate and reliable medical services."
        }
      />
      {/* Main content */}
      <div className="mt-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
        <figure>
          <img
            className="w-full h-full max-w-[98rem] object-cover rounded-md"
            src="https://i.ibb.co.com/S48PYgBW/a5a95fd5-2b1e-4080-b7e1-312f87259900.webp"
            alt="Image of Care Matrix Building"
          />
        </figure>
        <div className="space-y-4">
          <div className="collapse collapse-arrow bg-base-100 border border-base-300 ">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">
              What makes CareMatrix different from others?
            </div>
            <div className="collapse-content text-sm">
              We provide personalized healthcare with advanced technology,
              ensuring top-quality treatment by expert professionals.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              How does CareMatrix ensure service quality?
            </div>
            <div className="collapse-content text-sm">
              Our skilled team, latest medical equipment, and strict healthcare
              protocols maintain high standards of care.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              Is CareMatrix available 24/7?
            </div>
            <div className="collapse-content text-sm">
              Yes! We offer round-the-clock medical assistance, including
              emergency care and consultations.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              What services does CareMatrix provide?
            </div>
            <div className="collapse-content text-sm">
              We offer telemedicine, home nursing, elderly care, physiotherapy,
              mental health support, and emergency care.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              How does CareMatrix protect patient data?
            </div>
            <div className="collapse-content text-sm">
              We follow HIPAA-compliant security measures to ensure patient
              confidentiality and safety.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              Can I book an appointment online?
            </div>
            <div className="collapse-content text-sm">
              Yes! Our easy online booking lets you schedule doctor visits
              anytime.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
