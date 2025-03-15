import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { containerVariants, fadeIn, itemVariants } from '@/lib/varients'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import ReviewCard from './ReviewCard'

const FilterTabsPatient = ({setActiveTab, activeTab, currentReviews, handleHelpful , helpfulReviews, showReplyForm, setShowReplyForm, replyText, setReplyText, handleSubmitReply }) => {
  return (
    <motion.div variants={itemVariants}>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <div className="flex flex-col space-y-1.5 md:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-sky-800">Patient Reviews</h2>
                <TabsList className="bg-sky-50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                    All Reviews
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                    Recent
                  </TabsTrigger>
                  <TabsTrigger
                    value="highest"
                    className="data-[state=active]:bg-sky-600 data-[state=active]:text-white"
                  >
                    Highest Rated
                  </TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value={activeTab} className="space-y-6 mt-0">
                    {currentReviews.length > 0 ? (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                        {currentReviews.map((review, index) => (
                          <ReviewCard
                            key={review.id || index}
                            review={review}
                            onHelpful={handleHelpful}
                            helpfulCount={helpfulReviews[review.id || index] || 0}
                            showReplyForm={showReplyForm === (review.id || index)}
                            setShowReplyForm={setShowReplyForm}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            handleSubmitReply={handleSubmitReply}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div className="text-center py-10 text-sky-600" variants={fadeIn}>
                        <p>No reviews found matching your criteria.</p>
                      </motion.div>
                    )}
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
  )
}

export default FilterTabsPatient
