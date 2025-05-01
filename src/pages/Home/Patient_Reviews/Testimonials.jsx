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
  // console.log(data)
  if (isLoading) return <div className="flex items-center justify-center">
    <Loader2 className="animate-spin duration-200 " /></div>

  return (
    <section className="testimonials">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div id="customers-testimonials" className="owl-carousel">
              {data.map((name, idx) => (
                <div className="item" key={idx}>
                  <div className="shadow-effect">
                    <img
                      className="img-circle"
                      src="http://themes.audemedia.com/html/goodgrowth/images/testimonial3.jpg"
                      alt={name}
                    />
                    <p>
                      Dramatically maintain clicks-and-mortar solutions without functional
                      solutions. Completely synergize resource taxing relationships via premier
                      niche markets. Professionally cultivate.
                    </p>
                  </div>
                  <div className="testimonial-name">{name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
