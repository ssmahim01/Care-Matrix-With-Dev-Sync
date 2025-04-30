import { Loader2 } from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

const Loader = ({text}) => {
    return (
        <motion.div
            className="flex flex-row items-center justify-center min-h-[60vh]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <Loader2 className="w-12 h-12 text-sky-600 animate-spin mb-4" />
            <p className="text-sky-800 text-lg">{text}</p>
        </motion.div>
    )
}

export default Loader
