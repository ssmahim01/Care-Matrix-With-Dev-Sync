import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export function Testimonials() {

    const { data = [] } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/review/all`)
          setTestimonials(data)
          return data
        }
      })
      const [testimonials, setTestimonials] = useState(data) 

  return <AnimatedTestimonials testimonials={testimonials} />;
}
