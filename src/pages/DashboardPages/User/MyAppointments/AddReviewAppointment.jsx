import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { ChevronRight, Star } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const AddReviewAppointment = ({ handleSubmitReview, reviewDialog, setReviewDialog, newReview, setNewReview }) => {

    return (
        <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-sky-800">Share Your Experience</DialogTitle>
                    <DialogDescription className="text-sky-600">
                        Your feedback helps us improve our services and assists other patients.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                                name="name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select
                                name="department"
                                required
                            >
                                <SelectTrigger >
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cardiology">Cardiology</SelectItem>
                                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Your Rating</Label>
                            <RadioGroup
                                className="flex space-x-2"
                                value={newReview.rating.toString()}
                                onValueChange={(value) =>
                                    setNewReview((prev) => ({ ...prev, rating: Number(value) }))
                                }
                                name="rating"
                            >
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <div key={rating} className="flex flex-col items-center">
                                        <RadioGroupItem
                                            value={rating.toString()}
                                            id={`rating-${rating}`}
                                            className="sr-only"
                                        />
                                        <Label htmlFor={`rating-${rating}`} className="cursor-pointer">
                                            <Star
                                                className={`w-8 h-8 ${newReview.rating >= rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "fill-gray-200 text-gray-200"
                                                    }`}
                                            />
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>

                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="comment">Your Review</Label>
                            <Textarea
                                name="comment"
                                placeholder="Share your experience..."
                                className="min-h-[100px]"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter >
                        <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white">
                            Submit Review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddReviewAppointment
