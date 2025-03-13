
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { itemVariants } from '@/lib/varients'
import { Calendar, MessageSquare, Send, Star, ThumbsUp } from 'lucide-react'


const FeaturedReview = ({handleHelpful, helpfulReviews,setShowReplyForm, showReplyForm, replyText , setReplyText, handleSubmitReply}) => {
    return (
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-sky-100 shadow-md bg-gradient-to-r from-sky-50 to-white overflow-hidden">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <motion.div
                            className="flex-shrink-0"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <Avatar className="w-20 h-20 border-4 border-sky-100">
                                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Sarah Johnson" />
                                <AvatarFallback className="bg-sky-100 text-sky-800 text-xl">SJ</AvatarFallback>
                            </Avatar>
                        </motion.div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-xl text-sky-800">Sarah Johnson</h3>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <motion.div
                                                key={star}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: star * 0.1, type: "spring" }}
                                            >
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-sky-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>March 8, 2025</span>
                                    <span className="px-2">•</span>
                                    <span>Cardiology Department</span>
                                </div>
                            </div>
                            <motion.blockquote
                                className="italic text-gray-700 border-l-4 border-sky-200 pl-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                "I cannot express enough gratitude for the exceptional care I received at Horizon Medical Center.
                                Dr. Williams and his team were not only highly professional but also incredibly compassionate.
                                They took the time to explain my condition and treatment options thoroughly. The facilities are
                                state-of-the-art, and the staff made me feel comfortable throughout my stay. I'm now on the road
                                to recovery and feeling better than I have in years!"
                            </motion.blockquote>
                            <div className="flex items-center gap-4">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-sky-700 border-sky-200 hover:bg-sky-50"
                                        onClick={() => handleHelpful("featured")}
                                    >
                                        <ThumbsUp className="w-4 h-4 mr-2" />
                                        Helpful ({42 + (helpfulReviews["featured"] || 0)})
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-sky-700 hover:bg-sky-50"
                                        onClick={() => setShowReplyForm("featured")}
                                    >
                                        <MessageSquare className="w-4 h-4 mr-2" /> Reply
                                    </Button>
                                </motion.div>
                            </div>

                            {showReplyForm === "featured" && (
                                <motion.div
                                    className="flex gap-2 mt-2"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <Input
                                        placeholder="Write a reply..."
                                        className="flex-1"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    />
                                    <Button
                                        size="sm"
                                        className="bg-sky-600 hover:bg-sky-700"
                                        onClick={() => handleSubmitReply("featured")}
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default FeaturedReview
