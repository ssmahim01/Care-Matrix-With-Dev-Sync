// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { itemVariants } from '@/lib/varients'
import { Star } from 'lucide-react'

const PatientReviewHeader = () => {
    return (
        <motion.div className="text-center space-y-4 mb-8" variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl font-bold text-sky-800">Patient Reviews</h1>
            <p className="text-lg text-sky-600 max-w-2xl mx-auto">
                See what our patients are saying about their experience at Horizon Medical Center
            </p>
            <motion.div
                className="flex items-center justify-center gap-2 text-sky-700"
                transition={{ stiffness: 400, damping: 10 }}

            >
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                            key={star}
                            initial={{ rotate: -30, opacity: 0 }}
                            transition={{ delay: star * 0.1 }}
                            whileInView={{ rotate: 0, opacity: 1 }}
                        >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                    ))}
                </div>
                <span className="font-medium">4.8 out of 5</span>
                <span className="text-sky-600">based on 1,248 reviews</span>
            </motion.div>
        </motion.div>
    )
}

export default PatientReviewHeader
