import { Baby, Bone, Brain, Heart, Pill, SmileIcon, Stethoscope, Siren, Scissors, Activity, Video, Scan, HeartPulse } from "lucide-react"
import { GiStomach } from "react-icons/gi"

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
    title: "Neurologist",
    description: "Advanced diagnosis and treatment of disorders of the nervous system.",
    patientCount: 980,
    doctorCount: 6
  },
  {
    id: 3,
    Icon: Stethoscope ,
    title: "General Surgeon",
    description: "Preventive care and treatment of adult diseases and chronic conditions.",
    patientCount: 2100,
    doctorCount: 12
  },
  {
    id: 4,
    Icon: Baby ,
    title: "Pediatrician",
    description: "Specialized healthcare for infants, children, and adolescents.",
    patientCount: 1850,
    doctorCount: 9
  },
  {
    id: 5,
    Icon: Bone ,
    title: "Orthopedic Surgeon",
    description: "Treatment of musculoskeletal system including bones, joints, and muscles.",
    patientCount: 1420,
    doctorCount: 7
  },
  {
    id: 6,
    Icon: HeartPulse ,
    title: "Cardiologist",
    description: "Specializes in the diagnosis, treatment, and prevention of heart and blood vessel diseases.",
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
    title: "Dermatologist",
    description: "Diagnosis and treatment of skin, hair, and nail conditions.",
    patientCount: 950,
    doctorCount: 4
  },
  {
    id: 9,
    Icon: GiStomach ,
    title: "Oncologist",
    description: "Specializes in diagnosing and treating cancer.",
    patientCount: 950,
    doctorCount: 4
  },
]
