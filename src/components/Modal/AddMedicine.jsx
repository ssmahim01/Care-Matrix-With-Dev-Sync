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
import {
  dosageForms,
  manufacturers,
  medicine_categories,
  medicineStrengths,
  suppliers,
} from "@/lib/pharmacy";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { imgUpload } from "@/lib/imgUpload";
import { toast } from "sonner";
import axios from "axios";

const AddMedicine = ({ isOpen, setIsOpen, refetch }) => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [validUntil, setValidUntil] = useState(null);
  const [manufactureDate, setManufactureDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [selectedCategory, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [prescriptionRequired, setPrescriptionRequired] = useState("");
  const [selectedStrength, setSelectedStrength] = useState("");
  const [isReviewable, setIsReviewable] = useState("");
  const [loading, setLoading] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [storageConditions, setStorageConditions] = useState("");
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState({});
  const [supplier, setSupplier] = useState({});

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

  const discountPercentage = ((price - discountedAmount) / price) * 100;
  const roundedDiscountPercentage = parseInt(discountPercentage.toFixed(2));

  // Function for post medicine in db
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Form Validations
    const validations = [
      [!image, "Upload A Medicine Image To Proceed!"],
      [!selectedCategory, "Select A Category For The Medicine!"],
      [!dosageForm, "Specify A Dosage Form For The Medicine!"],
      [!selectedStrength, "Select A Strength Value For The Medicine!"],
      [!availability, "Indicate The Availability Status Of The Medicine!"],
      [prescriptionRequired === "", "Specify If A Prescription Is Required!"],
      [!validUntil, "Set A Valid Until Date For The Discount!"],
      [!isReviewable, "Indicate If The Medicine Is Reviewable!"],
      [!manufacturer?.name, "Provide The Manufacturer's Name!"],
      [!supplier?.name, "Provide The Supplier's Name!"],
      [
        !manufactureDate ||
          !(manufactureDate instanceof Date) ||
          isNaN(manufactureDate),
        "Please Provide A Valid Manufacture Date!",
      ],
      [
        !expiryDate || !(expiryDate instanceof Date) || isNaN(expiryDate),
        "Please Provide A Valid Expiry Date!",
      ],
      [
        manufactureDate && expiryDate && manufactureDate >= expiryDate,
        "Manufacture Date Must Be Earlier Than The Expiry Date!",
      ],
      [expiryDate && expiryDate <= today, "Expiry Date Must Be A Future Date!"],
    ];

    // Check all validations
    for (const [condition, errorMessage] of validations) {
      if (condition) {
        setLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          duration: 2000,
        });
        return;
      }
    }

    // Image upload
    let imageUrl;
    try {
      imageUrl = await imgUpload(image);
      if (!imageUrl) {
        toast.error("Image upload failed", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to upload image. Please try again later.", {
        position: "top-right",
        duration: 2000,
        style: {
          marginTop: "35px",
        },
      });
      return;
    }

    // Medicine Data
    const medicine = {
      brandName,
      genericName,
      category: selectedCategory,
      dosageForm,
      strength: selectedStrength,
      batchNumber,
      manufactureDate: manufactureDate.toISOString().split("T")[0],
      expiryDate: expiryDate.toISOString().split("T")[0],
      manufacturer,
      supplier,
      price: {
        amount: parseInt(price),
        currency: "BDT",
        discount: {
          percentage: roundedDiscountPercentage,
          discountedAmount: parseInt(discountedAmount),
          validUntil,
        },
      },
      prescriptionRequired: prescriptionRequired,
      storageConditions: storageConditions,
      availabilityStatus: availability,
      lastUpdated: new Date().toISOString(),
      imageURL: imageUrl,
      description: description,
      customerReviews: [],
      totalReviews: 0,
      isReviewable: isReviewable === "Yes" ? true : false,
    };

    try {
      // Post medicine in db --->
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/pharmacy/medicine`,
        medicine
      );
      if (data.data.insertedId) {
        refetch();
        toast.success("Medicine Added Successfully!", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        duration: 2000,
        style: {
          marginTop: "35px",
        },
      });
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"cursor-pointer"}>Add Medicines</Button>
      </DialogTrigger>
      <DialogContent className="w-[100%] max-w-none max-h-[80vh] overflow-y-auto p-6">
        <DashboardPagesHeader
          title={"Add Medicine"}
          subtitle={"Add new medicines to the pharmacy inventory"}
          icon={GiMedicines}
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand & Generic Name */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Brand Name</Label>
              <Input
                required
                placeholder={"Enter Medicine Brand Name"}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Generic Name</Label>
              <Input
                required
                placeholder={"Enter Medicine Generic Name"}
                onChange={(e) => setGenericName(e.target.value)}
              />
            </div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              required
              placeholder={"Enter Medicine Description"}
              onChange={(e) => setDescription(e.target.value)}
            />
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
                  className="mx-auto object-cover rounded w-[80%] h-44"
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
            {/* Dosage Form */}
            <div className="space-y-2">
              <Label>Dosage Form</Label>
              <Select value={dosageForm} onValueChange={setDosageForm}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Dosage Form" />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  {dosageForms.map((category, index) => (
                    <div key={index}>
                      <div className="px-3 py-1 text-sm font-semibold">
                        {category.category}
                      </div>
                      {category.forms.map((form, i) => (
                        <SelectItem key={form} value={form} className="px-4">
                          {form}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Strength */}
            <div className="space-y-2">
              <Label>Strength</Label>
              <Select
                value={selectedStrength}
                onValueChange={setSelectedStrength}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Medicine Strength" />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  {Object.entries(medicineStrengths).map(
                    ([category, strengths]) => (
                      <div key={category}>
                        <div className="px-4 py-2 text-sm font-medium">
                          {category}
                        </div>
                        {strengths.map((strength, i) => (
                          <SelectItem
                            key={`${category}-${strength}-${i}`}
                            value={strength}
                          >
                            {strength}
                          </SelectItem>
                        ))}
                      </div>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Batch Number */}
          <div className="space-y-2">
            <Label>Batch Number</Label>
            <Input
              required
              placeholder={"Enter Medicine Batch Number"}
              onChange={(e) => setBatchNumber(e.target.value)}
            />
          </div>
          {/* Storage Conditions */}
          <div className="space-y-2">
            <Label>Storage Conditions</Label>
            <Input
              required
              placeholder={"Enter Medicine Storage Conditions"}
              onChange={(e) => setStorageConditions(e.target.value)}
            />
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
                value={
                  prescriptionRequired === ""
                    ? undefined
                    : prescriptionRequired.toString()
                }
                onValueChange={(value) =>
                  setPrescriptionRequired(value === "true")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Prescription Required</SelectItem>
                  <SelectItem value="false">
                    Prescription Not Required
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Price & Discounted Price */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label>Original Price</Label>
              <Input
                required
                type="number"
                placeholder={"Original Price"}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Discounted Price</Label>
              <Input
                required
                type="number"
                placeholder={"Discounted Price"}
                onChange={(e) => setDiscountedAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2 ">
              <Label>Percentage</Label>
              <Input readOnly value={roundedDiscountPercentage} />
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
            <div className="space-y-2 py-0 my-0">
              <Label>Can users review?</Label>
              <Select
                className={"mb-0"}
                value={isReviewable}
                onValueChange={setIsReviewable}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option">
                    {isReviewable === "" ? "Select an option" : isReviewable}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={"Yes"}>Yes, Users can review</SelectItem>
                  <SelectItem value={"No"}>No, Users can't review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Manufacture & Supplier */}
          <div>
            {/* Manufacturer Select */}
            <div className="space-y-2">
              <Label>Select Manufacturer</Label>
              <Select
                value={manufacturer.name || ""}
                onValueChange={(value) => {
                  const selectedManufacturer = manufacturers.find(
                    (m) => m.name === value
                  );
                  setManufacturer(selectedManufacturer);
                }}
              >
                <SelectTrigger className="w-full">
                  {manufacturer.name ? (
                    <span>{manufacturer.name}</span>
                  ) : (
                    <SelectValue placeholder="Select Manufacturer" />
                  )}
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  {manufacturers.map((m) => (
                    <SelectItem key={m.name} value={m.name}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Supplier Select */}
            <div className="space-y-2">
              <Label>Select Supplier</Label>
              <Select
                value={supplier.name || ""}
                onValueChange={(value) => {
                  const selectedSupplier = suppliers.find(
                    (s) => s.name === value
                  );
                  setSupplier(selectedSupplier);
                }}
              >
                <SelectTrigger className="w-full">
                  {supplier.name ? (
                    <span>{supplier.name}</span>
                  ) : (
                    <SelectValue placeholder="Select Supplier" />
                  )}
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  {suppliers.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
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
          {/* Submit Button */}
          <div>
            <Button
              disabled={loading}
              className={"w-full cursor-pointer"}
              type="submit"
            >
              {loading ? "Adding Medicine....." : "Add Medicine"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicine;
