import React, { useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import 'owl.carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './testy.css';

// 👇 Make jQuery globally accessible
(window ).$ = $;
(window ).jQuery = $;

export function Testimonials() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/review/all`);
      return data;
    }
  });

  useEffect(() => {
    if (data.length > 0) {
      $('#customers-testimonials').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          1170: { items: 3 }
        }
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin duration-200" />
      </div>
    );
  }

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
                      src={name.avatar}
                      alt={name.name}
                    />
                    <p>
                      Dramatically maintain clicks-and-mortar solutions without functional
                      solutions. Completely synergize resource taxing relationships via premier
                      niche markets. Professionally cultivate.
                    </p>
                  </div>
                  <div className="testimonial-name">{name.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
