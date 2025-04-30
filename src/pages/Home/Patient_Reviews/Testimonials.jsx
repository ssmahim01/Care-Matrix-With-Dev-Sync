import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";


export function Testimonials() {

    const { data = [], isLoading } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/review/all`)
          return data
        }
      }) 
      console.log(data)
      if(isLoading) return <div className="flex items-center justify-center">
        <Loader2 className="animate-spin duration-200 "/></div>

  return <AnimatedTestimonials testimonials={data} />;
}
