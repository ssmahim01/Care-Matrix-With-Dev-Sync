
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FacilityCard({ facility }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full border-sky-100 hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative h-48 w-full">
          <img src={facility.image || "/placeholder.svg"} alt={facility.name} className="object-cover" />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-sky-800 mb-2">{facility.name}</h3>
          <p className="text-sky-600">{facility.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="outline" className="border-sky-200 text-sky-700 hover:bg-sky-50">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

