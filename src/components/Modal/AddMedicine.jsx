import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { GiMedicines } from "react-icons/gi";
import { MdDelete } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { medicine_categories } from "@/lib/pharmacy";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const AddMedicine = ({ isOpen, setIsOpen }) => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [validUntil, setValidUntil] = useState(null);
  const [manufactureDate, setManufactureDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [selectedCategory, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [prescriptionRequired, setPrescriptionRequired] = useState("");
  const [isReviewable, setIsReviewable] = useState("");

  // Image Upload Functionality
  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Medicines</Button>
      </DialogTrigger>
      <DialogContent className="w-[100%] max-w-none max-h-[80vh] overflow-y-auto p-6">
        <DashboardPagesHeader
          title={"Add Medicine"}
          subtitle={"Add new medicines to the pharmacy inventory"}
          icon={GiMedicines}
        />

        {/* Form */}
        <form className="space-y-4">
          {/* Brand & Generic Name */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Brand Name</Label>
              <Input placeholder={"Enter Medicine Brand Name"} />
            </div>
            <div className="space-y-2">
              <Label>Generic Name</Label>
              <Input placeholder={"Enter Medicine Generic Name"} />
            </div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder={"Enter Medicine Description"} />
          </div>
          {/* Image */}
          <div className="w-full">
            <input
              type="file"
              name="image"
              id="image_input"
              className="hidden"
              onChange={handleFileChange}
            />
            {preview === "" ? (
              <div
                className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-gray-300 border rounded-md py-4 cursor-pointer"
                onClick={handleUploadImage}
              >
                <FaFileUpload className="text-[2rem] text-[#777777]" />
                <p className="text-gray-700">
                  Browse To Upload Ranking Image File
                </p>
              </div>
            ) : (
              <div className="relative w-full border border-gray-200 rounded-xl p-4">
                <img
                  src={preview}
                  alt="Selected file preview"
                  className="mx-auto object-cover rounded-full w-[80%] h-44"
                />
                <MdDelete
                  className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer rounded-tr-[13px]"
                  onClick={() => {
                    setPreview("");
                    setImage(null);
                  }}
                />
                {image && (
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium text-gray-700">
                      {image.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(image.size / 1024).toFixed(2)} KB | {image.type}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Select Category */}
          <div className="space-y-2">
            <Label>Select Category</Label>
            <Select value={selectedCategory} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {medicine_categories
                  .filter((item) => item.category_name !== "All Medicines")
                  .map((item, i) => (
                    <SelectItem key={i} value={item.category_name}>
                      {item.category_name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          {/* Dosage Form & Strength */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Dosage Form</Label>
              <Input placeholder={"Enter Medicine Dosage Form"} />
            </div>
            <div className="space-y-2">
              <Label>Strength</Label>
              <Input placeholder={"Enter Medicine Strength"} />
            </div>
          </div>
          {/* Batch Number */}
          <div className="space-y-2">
            <Label>Batch Number</Label>
            <Input placeholder={"Enter Medicine Batch Number"} />
          </div>
          {/* Storage Conditions */}
          <div className="space-y-2">
            <Label>Storage Conditions</Label>
            <Input placeholder={"Enter Medicine Storage Conditions"} />
          </div>
          {/* Availability & Prescription Required */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {/* Availability */}
            <div className="space-y-2">
              <Label>Availability Status</Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Availability Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Limited Stock">Limited Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Prescription Required */}
            <div className="space-y-2">
              <Label>Prescription Required</Label>
              <Select
                value={prescriptionRequired}
                onValueChange={setPrescriptionRequired}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select An option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={true}>Prescription Required</SelectItem>
                  <SelectItem value={false}>
                    Prescription Not Required
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Price & Discounted Price */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Original Price</Label>
              <Input type="number" placeholder={"Enter Original Price"} />
            </div>
            <div className="space-y-2">
              <Label>Discounted Price</Label>
              <Input type="number" placeholder={"Enter Discounted Price"} />
            </div>
          </div>
          {/* Discount Valid Until & isReviewable */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Discount Price Valid Until</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !validUntil && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {validUntil ? (
                      format(validUntil, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={validUntil}
                    onSelect={setValidUntil}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* isReviewable */}
            <div className="space-y-2">
              <Label>Can users review?</Label>
              <Select value={isReviewable} onValueChange={setIsReviewable}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={true}>Yes, Users can review</SelectItem>
                  <SelectItem value={false}>No, Users can't review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Manufacture Date & Expiry Date */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {/* Manufacture Date */}
            <div className="space-y-2">
              <Label>Manufacture Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !manufactureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {manufactureDate ? (
                      format(manufactureDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={manufactureDate}
                    onSelect={setManufactureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Expiry Date */}
            <div className="space-y-2">
              <Label>Medicine Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !expiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? (
                      format(expiryDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={setExpiryDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicine;
