/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSquare, Send, Star, ThumbsUp } from "lucide-react"

export default function ReviewCard({
    review,
    onHelpful,
    helpfulCount = 0,
    showReplyForm,
    setShowReplyForm,
    replyText,
    setReplyText,
    handleSubmitReply,
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card className="border-sky-100 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="flex-shrink-0"
                        >
                            <Avatar className="w-12 h-12 border-2 border-sky-100">
                                <AvatarImage src={review.avatar || "/placeholder.svg?height=48&width=48"} alt={review.name} />
                                <AvatarFallback className="bg-sky-100 text-sky-800">
                                    {review.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                        </motion.div>
                        <div className="space-y-2 flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-sky-800">{review.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-sky-600">
                                        <span>{review.date}</span>
                                        <span>•</span>
                                        <span>{review.department}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.1, type: "spring" }}
                                        >
                                            <Star
                                                className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <motion.p
                                className="text-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {review.comment}
                            </motion.p>
                            <div className="flex items-center gap-2 pt-2">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-sky-700 hover:bg-sky-50 h-8 px-2"
                                        onClick={() => onHelpful(review.id)}
                                    >
                                        <ThumbsUp className="w-3 h-3 mr-1" />
                                        Helpful ({review.helpful + helpfulCount})
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-sky-700 hover:bg-sky-50 h-8 px-2"
                                        onClick={() => setShowReplyForm(review.id)}
                                    >
                                        <MessageSquare className="w-3 h-3 mr-1" /> Reply
                                    </Button>
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {showReplyForm && (
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
                                            onClick={() => handleSubmitReply(review.id)}
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
