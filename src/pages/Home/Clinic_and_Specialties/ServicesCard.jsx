
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight} from "lucide-react"


export default function ServiceCard({ icon, title, description, features }) {

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full border-sky-100 hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-sky-50 p-3 rounded-full">{icon}</div>
            <div>
              <h3 className="text-xl font-bold text-sky-800 mb-2">{title}</h3>
              <p className="text-sky-600 mb-4">{description}</p>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-sky-700">
                    <ChevronRight className="h-4 w-4 text-sky-500 mr-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

