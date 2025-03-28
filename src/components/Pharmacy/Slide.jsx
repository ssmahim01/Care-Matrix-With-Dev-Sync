import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { delay, motion } from "framer-motion";
function Slide({ image, title, subtitle }) {
    return (
        <div
            className="container bg-cover bg-center object-cover bg-no-repeat px-4 md:px-8 py-10 bg-blend-overlay flex flex-col-reverse md:flex-row justify-between items-center">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="flex flex-1 flex-col items-start mt-10 md:mt-0 gap-4">
                <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold">
                    {title}
                </h2>
                <p className="text-black/60 max-w-md">
                    {subtitle.length > 150 ? `${subtitle.substring(0, 150)}...` : subtitle}
                </p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
                >

                    <Link to={"/shop"}>
                        <Button className="mt-4 bg-black text-white cursor-pointer" size="lg">
                            Buy Now
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
            <div className="flex-1 flex justify-end">
                <img
                    className="w-full md:w-96 h-40 md:h-96 object-cover"
                    src={image}
                    alt=""
                />
            </div>
        </div>
    );
}

export default Slide;
