import { Baby, Bone, Brain, Eye, Heart, Pill, SmileIcon, Stethoscope, Siren, Scissors, Activity, Video, Scan } from "lucide-react"

// Sample data
export const reviews = [
  {
    id: 1,
    name: "Michael Thompson",
    date: "2025-03-05",
    department: "Orthopedics",
    rating: 5,
    comment:
      "After my knee replacement surgery, the care I received was outstanding. The physical therapy team was especially helpful in my recovery process.",
    helpful: 18,
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    date: "2025-02-20",
    department: "Pediatrics",
    rating: 5,
    comment:
      "Dr. Chen was amazing with my daughter. She was scared about her check-up, but he made her laugh and feel comfortable. The nurses were also very kind and patient.",
    helpful: 24,
  },
  {
    id: 3,
    name: "David Wilson",
    date: "2025-02-15",
    department: "Cardiology",
    rating: 4,
    comment:
      "The cardiology department is top-notch. My only complaint would be the wait time, but the quality of care made up for it.",
    helpful: 9,
  },
  {
    id: 4,
    name: "Lisa Martinez",
    date: "2025-01-30",
    department: "Obstetrics",
    rating: 5,
    comment:
      "I delivered my baby here and had the most wonderful experience. The birthing suites are beautiful, and the nurses were incredibly supportive throughout labor and delivery.",
    helpful: 31,
  },
  {
    id: 5,
    name: "Robert Johnson",
    date: "2025-01-10",
    department: "Emergency",
    rating: 3,
    comment:
      "The ER was very busy when I arrived, but the staff did their best to manage everyone. Once I was seen, the care was good, but the initial wait was difficult.",
    helpful: 7,
  },
  {
    id: 6,
    name: "Jennifer Lee",
    date: "2024-12-15",
    department: "Cardiology",
    rating: 5,
    comment:
      "Dr. Patel is an exceptional cardiologist. He explained my condition in terms I could understand and created a treatment plan that has significantly improved my quality of life.",
    helpful: 42,
  },
  {
    id: 7,
    name: "Thomas Brown",
    date: "2024-12-05",
    department: "Orthopedics",
    rating: 4,
    comment:
      "The orthopedic team was very professional. My shoulder surgery went well, and the follow-up care has been excellent. The only reason for 4 stars is the scheduling difficulties.",
    helpful: 15,
  },
  {
    id: 8,
    name: "Sophia Garcia",
    date: "2024-11-20",
    department: "Pediatrics",
    rating: 5,
    comment:
      "The pediatric ward is so child-friendly! My son was actually excited to go to his appointment. The staff are wonderful with children and really know how to put them at ease.",
    helpful: 28,
  },
]

export const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "https://i.ibb.co.com/WWp3yKDz/image.png",
    rating: 4.9,
    experience: "15 years",
    education: "Harvard Medical School",
    availability: "Mon, Wed, Fri",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image: "https://i.ibb.co.com/F4M3hFY4/image.png",
    rating: 4.8,
    experience: "12 years",
    education: "Johns Hopkins University",
    availability: "Tue, Thu, Sat",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    image: "https://i.ibb.co.com/39hPW8d1/image.png",
    rating: 4.9,
    experience: "10 years",
    education: "Stanford University",
    availability: "Mon, Tue, Thu",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    image: "https://i.ibb.co.com/FbsX85Nn/image.png",
    rating: 4.7,
    experience: "18 years",
    education: "Yale University",
    availability: "Wed, Fri, Sat",
  },
  {
    id: 5,
    name: "Dr. Lisa Patel",
    specialty: "Ophthalmology",
    image: "https://i.ibb.co.com/FbsX85Nn/image.png",
    rating: 4.8,
    experience: "14 years",
    education: "Columbia University",
    availability: "Mon, Wed, Fri",
  },
  {
    id: 6,
    name: "Dr. Robert Thompson",
    specialty: "Dentistry",
    image: "https://i.ibb.co.com/39hPW8d1/image.png",
    rating: 4.6,
    experience: "9 years",
    education: "University of Pennsylvania",
    availability: "Tue, Thu, Sat",
  },
  {
    id: 7,
    name: "Dr. Maria Gonzalez",
    specialty: "Dermatology",
    image: "https://i.ibb.co.com/F4M3hFY4/image.png",
    rating: 4.9,
    experience: "11 years",
    education: "UCLA Medical School",
    availability: "Mon, Thu, Fri",
  },
  {
    id: 8,
    name: "Dr. David Kim",
    specialty: "Internal Medicine",
    image: "https://i.ibb.co.com/WWp3yKDz/image.png",
    rating: 4.7,
    experience: "16 years",
    education: "Duke University",
    availability: "Tue, Wed, Sat",
  },
]

export const services = [
  {
    id: 1,
    title: "Preventive Health Check-ups",
    description: "Comprehensive health screenings to detect potential health issues before they become serious.",
    Icon: Stethoscope ,
    features: ["Complete blood work", "Cardiac assessment", "Cancer screenings", "Vision and hearing tests"],
  },
  {
    id: 2,
    title: "Emergency Care",
    description: "24/7 emergency medical services with rapid response teams for critical situations.",
    Icon: Siren,
    features: ["24/7 availability", "Trauma care", "Critical care specialists", "Advanced life support"],
  },
  {
    id: 3,
    title: "Surgical Procedures",
    description: "State-of-the-art surgical facilities for both major and minor procedures.",
    Icon: Scissors,
    features: ["Minimally invasive options", "Robotic surgery", "Same-day surgery", "Comprehensive post-op care"],
  },
  {
    id: 4,
    title: "Diagnostic Imaging",
    description: "Advanced imaging services to accurately diagnose medical conditions.",
    Icon: Scan,
    features: ["MRI", "CT scans", "Ultrasound", "X-rays", "PET scans"],
  },
  {
    id: 5,
    title: "Rehabilitation Services",
    description: "Comprehensive rehabilitation programs to help patients recover from injuries and surgeries.",
    Icon: Activity,
    features: ["Physical therapy", "Occupational therapy", "Speech therapy", "Cardiac rehabilitation"],
  },
  {
    id: 6,
    title: "Telemedicine Consultations",
    description: "Virtual consultations with our specialists from the comfort of your home.",
    Icon: Video,
    features: ["Convenient scheduling", "Secure platform", "Follow-up care", "Prescription services"],
  },
]

export const facilities = [
  {
    id: 1,
    name: "Advanced Surgical Suites",
    description: "State-of-the-art operating rooms equipped with the latest technology for all types of surgeries.",
    image: "https://static.vecteezy.com/system/resources/previews/053/732/875/large_2x/advanced-surgical-suite-highlighting-modern-medical-tools-and-cutting-edge-technology-free-photo.jpg",
  },
  {
    id: 2,
    name: "Diagnostic Imaging Center",
    description: "Comprehensive imaging services including MRI, CT, ultrasound, and X-ray with rapid results.",
    image: "https://www.fightingcancerbd.com/images/featured_serviceprovider/1695704121_FightingCancer_Ibn%20Sina%20Diagnostic%20Center_Image1.png",
  },
  {
    id: 3,
    name: "Cardiac Catheterization Lab",
    description:
      "Specialized facility for diagnosing and treating heart conditions with minimally invasive procedures.",
    image: "https://www.avantihnw.com/api/rp/w1200/h630/aHR0cHM6Ly93d3cuYXZhbnRpaG53LmNvbS9kYXRhL2VuLzEvMDEvYzg0OWQ2MzYtOTljMS00ZjhhLWIyYzAtMjgyMjU3NjllYTc2LmpwZw===.jpg",
  },
  {
    id: 4,
    name: "Maternity and Neonatal Care",
    description: "Comfortable birthing suites and advanced neonatal intensive care unit for newborns.",
    image: "https://northeastlondon.icb.nhs.uk/wp-content/uploads/2024/07/Maternity-shutterstock-image-scaled.jpg",
  },
  {
    id: 5,
    name: "Rehabilitation Center",
    description: "Comprehensive rehabilitation services with modern equipment and specialized therapists.",
    image: "https://www.hebrewseniorlife.org/sites/default/files/2019-10/woman-on-exercise-bike-with-therapist_0.jpg",
  },
  {
    id: 6,
    name: "Emergency Department",
    description: "24/7 emergency care with trauma rooms, triage areas, and dedicated emergency specialists.",
    image: "https://cumberlandhealthcare.com/wp-content/uploads/2023/06/TBO_9315Trauma-scaled.jpg",
  },
]

export const specialties = [
  {
    id: 1,
    Icon: Heart,
    title: "Cardiology",
    description: "Comprehensive heart care including diagnostics, interventions, and rehabilitation.",
    patientCount: 1250,
    doctorCount: 8
  },
  {
    id: 2,
    Icon: Brain ,
    title: "Neurology",
    description: "Advanced diagnosis and treatment of disorders of the nervous system.",
    patientCount: 980,
    doctorCount: 6
  },
  {
    id: 3,
    Icon: Stethoscope ,
    title: "Internal Medicine",
    description: "Preventive care and treatment of adult diseases and chronic conditions.",
    patientCount: 2100,
    doctorCount: 12
  },
  {
    id: 4,
    Icon: Baby ,
    title: "Pediatrics",
    description: "Specialized healthcare for infants, children, and adolescents.",
    patientCount: 1850,
    doctorCount: 9
  },
  {
    id: 5,
    Icon: Bone ,
    title: "Orthopedics",
    description: "Treatment of musculoskeletal system including bones, joints, and muscles.",
    patientCount: 1420,
    doctorCount: 7
  },
  {
    id: 6,
    Icon: Eye ,
    title: "Ophthalmology",
    description: "Diagnosis and treatment of eye disorders and vision problems.",
    patientCount: 1100,
    doctorCount: 5
  },
  {
    id: 7,
    Icon: SmileIcon ,
    title: "Dentistry",
    description: "Comprehensive dental care including preventive, restorative, and cosmetic services.",
    patientCount: 1680,
    doctorCount: 8
  },
  {
    id: 8,
    Icon: Pill ,
    title: "Dermatology",
    description: "Diagnosis and treatment of skin, hair, and nail conditions.",
    patientCount: 950,
    doctorCount: 4
  }
]
