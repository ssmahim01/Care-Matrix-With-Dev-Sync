
import { useState, useEffect } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import ReviewComment from "./ReviewComment"
import { containerVariants, itemVariants } from "@/lib/varients"
import FeaturedReview from "./FeaturedReview"
import Loader from "@/shared/Loader"
import PatientReviewHeader from "./PatientReviewHeader"
import FilterTabsPatient from "./FilterTabsPatient"
import ReviewsPagination from "./ReviewsPagination"
import axios from "axios"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { useAuthUser } from "@/redux/auth/authActions"

export default function PatientReviews() {
  const user = useAuthUser()
  
  const {data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/review/all`)
      setFilteredReviews(data)
      return data
    }
  })

  // State management
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [filteredReviews, setFilteredReviews] = useState(reviews)
  const [showReplyForm, setShowReplyForm] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [helpfulReviews, setHelpfulReviews] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewsPerPage] = useState(3)
  const [showLoadMore, setShowLoadMore] = useState(true)
  const [newReview, setNewReview] = useState({
    name: "",
    department: "",
    rating: 5,
    comment: "",
  })
  const [reviewDialog, setReviewDialog] = useState(false);


  // Filter reviews based on search, department, and active tab
  useEffect(() => {
    let results = [...reviews]

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (review) =>
          review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.department.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by department
    if (selectedDepartment !== "all") {
      results = results.filter((review) => review.department === selectedDepartment)
    }

    // Filter by tab
    if (activeTab === "recent") {
      results = results
        .slice() // clone array to avoid mutating original
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (activeTab === "highest") {
      results = results.filter((review) => review.rating >= 5)
    }

    setFilteredReviews(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedDepartment, activeTab])

  // Get current reviews for pagination
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview)
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)

  // Handle marking a review as helpful
  const handleHelpful = (reviewId) => {
    setHelpfulReviews((prev) => {
      const newState = { ...prev }
      newState[reviewId] = (newState[reviewId] || 0) + 1
      return newState
    })
  }

  // Handle submitting a new review
  const handleSubmitReview = async (e) => {
    e.preventDefault()

    const form = e.target
    const name = form.name.value;
    const department = form.department.value;
    const rating = form.rating.value;
    const comment = form.comment.value;
    const date = new Date().toLocaleDateString()

    const review = { name, department, rating, comment, helpful: 0, date, avatar: user.photoURL };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/review/add`, review)
      if (res.data) return toast.success(res.data.message, { description: "Check the review list" })
    } catch (error) {
      console.log(error)
    } finally {
      refetch()
      setReviewDialog(false)
    }

    // Trigger refiltering
    setActiveTab("all")
    setSearchQuery("")
    setSelectedDepartment("all")

  }

  // Handle submitting a reply
  const handleSubmitReply = (reviewId) => {
    setShowReplyForm(null)
    setReplyText("")

    toast.success(`Reply submitted for review #${reviewId}`)
  }

  // Handle load more
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else {
      setShowLoadMore(false)
    }
  }


  return (
    <div className="mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl pt-10 my-10">
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div className="space-y-6" animate="visible" variants={containerVariants}>
          {/* Header Section */}
          <PatientReviewHeader />

          {/* Search and Filter */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" variants={itemVariants}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 h-4 w-4" />
              <Input
                placeholder="Search reviews..."
                className="pl-10 border-sky-200 focus:border-sky-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-500 hover:text-sky-700"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 h-4 w-4" />
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="pl-10 border-sky-200">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Obstetrics">Obstetrics</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ReviewComment
              handleSubmitReview={handleSubmitReview}
              newReview={newReview}
              setNewReview={setNewReview}
              setReviewDialog={setReviewDialog}
              reviewDialog={reviewDialog}
            />
          </motion.div>

          {/* Featured Review */}
          <FeaturedReview
            handleHelpful={handleHelpful}
            handleSubmitReply={handleSubmitReply}
            helpfulReviews={helpfulReviews}
            replyText={replyText}
            setReplyText={setReplyText}
            setShowReplyForm={setShowReplyForm}
            showReplyForm={showReplyForm}
          />


          {/* Filter Tabs */}
          <FilterTabsPatient
            activeTab={activeTab}
            currentReviews={currentReviews}
            handleHelpful={handleHelpful}
            handleSubmitReply={handleSubmitReply}
            helpfulReviews={helpfulReviews}
            replyText={replyText}
            setActiveTab={setActiveTab}
            setReplyText={setReplyText}
            setShowReplyForm={setShowReplyForm}
            showReplyForm={showReplyForm}
          />

          {/* Pagination and Load More */}
          <ReviewsPagination
            filteredReviews={filteredReviews}
            handleLoadMore={handleLoadMore}
            setCurrentPage={setCurrentPage}
            showLoadMore={showLoadMore}
            totalPages={totalPages}
            currentPage={currentPage}
          />

          {/* Call to Action */}
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-sky-50 border-sky-100 mt-8 py-6">
              <CardHeader>
                <CardTitle className="text-sky-800">Share Your Experience</CardTitle>
                <CardDescription className="text-sky-600">
                  Your feedback helps us improve our services and assists other patients in making informed decisions.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <ReviewComment handleSubmitReview={handleSubmitReview} newReview={newReview} setNewReview={setNewReview} />
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

