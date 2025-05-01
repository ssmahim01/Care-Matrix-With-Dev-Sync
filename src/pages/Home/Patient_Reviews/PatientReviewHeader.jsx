
import { motion } from "framer-motion"
import { itemVariants } from '@/lib/varients'
import { Star } from 'lucide-react'

const PatientReviewHeader = ({filteredReviews}) => {
    const totalRatings = filteredReviews.reduce((sum, review) => sum + Number(review.rating), 0);
const averageRating = totalRatings / filteredReviews.length;
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
                    {Array.from({ length: averageRating.toLocaleString().slice(0,1) }).map((star, i) => (
                        <motion.div
                            key={i}
                            initial={{ rotate: -30, opacity: 0 }}
                            transition={{ delay: star * 0.1 }}
                            whileInView={{ rotate: 0, opacity: 1 }}
                        >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                    ))}
                </div>
                <span className="font-medium">{averageRating.toLocaleString().slice(0,3)} out of 5</span>
                <span className="text-sky-600">based on {filteredReviews.length} reviews</span>
            </motion.div>
        </motion.div>
    )
}

export default PatientReviewHeader
