import { Github, Linkedin, Mail, Twitter } from "lucide-react";

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Sayman Shakil Mahim",
    role: "Team Leader",
    image: "https://i.ibb.co.com/TxLYwr1R/IMG-6716.jpg",
    github: "https://github.com/sarahjohnson",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    email: "sarah@carematrix.com",
  },
  {
    id: 2,
    name: "Sheikh Saiyam",
    role: "Front-end Developer",
    image: "https://i.ibb.co.com/QF4hLXMk/Screenshot-2025-05-01-193220.png",
    github: "https://github.com/sheikh-saiyam",
    linkedin: "https://linkedin.com/in/sheikh-saiyam",
    email: "sheikhsaiyam29@gmail.com",
  },
  {
    id: 3,
    name: "Asadur Rahaman Yead",
    role: "Full-stack Developer",
    image:
      "https://i.ibb.co.com/jMGvzgG/129-B9601-F648-478-B-BD73-81015965-CDAC.jpg",
    github: "https://github.com/Yead191",
    linkedin: "https://www.linkedin.com/in/md-asadur-rahaman-yead/",
    email: "yead191@gmail.com",
  },
  {
    id: 4,
    name: "Abu Sayed Khan",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=300&width=300",
    github: "https://github.com/jameswilson",
    linkedin: "https://linkedin.com/in/jameswilson",
    email: "james@carematrix.com",
  },
  {
    id: 5,
    name: "Nafizul Iqram",
    role: "Front-end Developer",
    image: "/placeholder.svg?height=300&width=300",
    github: "https://github.com/oliviamartinez",
    linkedin: "https://linkedin.com/in/oliviamartinez",
    email: "olivia@carematrix.com",
  },
  {
    id: 6,
    name: "Md. Ar Rafi Fayez Joy",
    role: "Front-end Developer",
    image: "/placeholder.svg?height=300&width=300",
    github: "https://github.com/davidkim",
    linkedin: "https://linkedin.com/in/davidkim",
    email: "david@carematrix.com",
  },
];

// Social link component
const SocialLink = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-2 rounded-full hover:bg-white/90 transition-colors duration-200"
      aria-label={label}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </a>
  );
};

// Team member card component
const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        {/* Experience badge similar to the 20+ years badge in the screenshot */}
        {/* <div className="absolute top-4 right-4 bg-white/90 rounded-lg shadow-md px-3 py-2 z-10">
          <p className="text-[#0E82FD] font-bold text-lg">5+</p>
          <p className="text-xs text-gray-600 font-medium">Years Experience</p>
        </div> */}

        <div className="h-64 overflow-hidden">
          <img
            src={member?.image || "/placeholder.svg"}
            alt={member.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Overlay with social icons */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E82FD]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
          <div className="flex gap-3">
            {member.github && (
              <SocialLink
                href={member.github}
                icon={<Github className="h-5 w-5" />}
                label="GitHub"
              />
            )}
            {member.linkedin && (
              <SocialLink
                href={member.linkedin}
                icon={<Linkedin className="h-5 w-5" />}
                label="LinkedIn"
              />
            )}
            {member.email && (
              <SocialLink
                href={`mailto:${member.email}`}
                icon={<Mail className="h-5 w-5" />}
                label="Email"
              />
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#464646]">{member.name}</h3>
        <p className="text-[#0E82FD] font-medium">{member.role}</p>

        {/* Blue feature box similar to the ones in the screenshot
        <div className="mt-4 bg-[#0E82FD] text-white p-3 rounded-md">
          <p className="text-sm">
            Dedicated to bringing innovative healthcare solutions to our
            patients
          </p>
        </div> */}
      </div>
    </div>
  );
};

// Main team section component
const TeamSection = ({ title, subtitle, description }) => {
  // Default props
  title = title || "Meet Our Team";
  subtitle = subtitle || "The Brilliant Minds Behind CareMatrix";
  description =
    description ||
    "Our dedicated team of six professionals combines expertise in healthcare and technology to deliver an exceptional medical platform that prioritizes your well-being.";

  return (
    <section className="pt-24 pb-6">
      <div>
        <div className="text-center mb-8">
          <h4 className="text-[#0E82FD] font-semibold text-sm uppercase tracking-wider">
            {title}
          </h4>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
            The Brilliant <span className="text-[#0E82FD] ">Minds</span> Behind
            CareMatrix
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-[#0E82FD] font-medium hover:text-[#0E82FD]/80 transition-colors cursor-pointer">
            <span>View All Team Members</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TeamSection;
