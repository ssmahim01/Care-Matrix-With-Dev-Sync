import { useState, useEffect } from "react";
import { Clock, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageWithMagnifier from "@/shared/Section/ImageWithMagnifier";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MedicineDetails() {
  const { id } = useParams();

  const {
    data: medicine = {},
    isLoading,
    refetch: medicineRefetch,
  } = useQuery({
    queryKey: ["medicine-details", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/pharmacy/medicine/${id}`
      );
      return data;
    },
    enabled: !!id,
  });

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // C.c.to.d.expr.date
  useEffect(() => {
    if (!medicine?.price?.discount?.validUntil) return;

    const calculateTimeLeft = () => {
      const discountDate = new Date(medicine.price.discount.validUntil);
      const now = new Date();
      const difference = discountDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [medicine?.price?.discount?.validUntil]);

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  };

  const formatNumber = (num) => {
    return num?.toString().padStart(2, "0") || "00";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="pt-24 pb-12 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Image */}
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden bg-white">
            <div className="absolute top-4 left-4 z-10 space-y-2">
              {medicine?.price?.discount && (
                <Badge className="bg-rose-600 hover:bg-rose-700">
                  {medicine?.price?.discount?.percentage}% OFF
                </Badge>
              )}
              {medicine?.prescriptionRequired && (
                <Badge variant="outline" className="bg-white ml-2">
                  Prescription Required
                </Badge>
              )}
            </div>
            <ImageWithMagnifier imageURL={medicine?.imageURL || ""} />
          </div>
          {/* Product Details */}
          <Card className={"border shadow-none border-[#e5e7eb]"}>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-2">Product Details</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-muted-foreground">Category</div>
                <div>{medicine?.category || "N/A"}</div>

                <div className="text-muted-foreground">Dosage Form</div>
                <div>{medicine?.dosageForm || "N/A"}</div>

                <div className="text-muted-foreground">Batch Number</div>
                <div>{medicine?.batchNumber || "N/A"}</div>

                <div className="text-muted-foreground">Manufacture Date</div>
                <div>{formatDate(medicine?.manufactureDate)}</div>

                <div className="text-muted-foreground">Expiry Date</div>
                <div>{formatDate(medicine?.expiryDate)}</div>

                <div className="text-muted-foreground">Storage</div>
                <div>{medicine?.storageConditions || "N/A"}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {medicine?.brandName || "N/A"}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              {medicine?.genericName || ""} • {medicine?.strength || ""}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                {medicine?.availabilityStatus || "N/A"}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {medicine?.price?.currency || "N/A"}{" "}
                {medicine?.price?.discount
                  ? medicine.price?.discount?.discountedAmount
                  : medicine?.price?.amount || "0"}
              </span>
              {medicine?.price?.discount && (
                <span className="text-lg text-muted-foreground line-through">
                  {medicine?.price?.currency} {medicine?.price?.amount}
                </span>
              )}
            </div>

            {medicine?.price?.discount && (
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Offer ends in:</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-background rounded p-2 text-center">
                    <div className="text-2xl font-bold">
                      {formatNumber(timeLeft.days)}
                    </div>
                    <div className="text-xs text-muted-foreground">Days</div>
                  </div>
                  <div className="bg-background rounded p-2 text-center">
                    <div className="text-2xl font-bold">
                      {formatNumber(timeLeft.hours)}
                    </div>
                    <div className="text-xs text-muted-foreground">Hours</div>
                  </div>
                  <div className="bg-background rounded p-2 text-center">
                    <div className="text-2xl font-bold">
                      {formatNumber(timeLeft.minutes)}
                    </div>
                    <div className="text-xs text-muted-foreground">Minutes</div>
                  </div>
                  <div className="bg-background rounded p-2 text-center">
                    <div className="text-2xl font-bold">
                      {formatNumber(timeLeft.seconds)}
                    </div>
                    <div className="text-xs text-muted-foreground">Seconds</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">
              {medicine?.description || "No description available"}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="h-10 w-10 rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-medium">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-10 w-10 rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`h-10 w-10 ${isFavorite ? "text-rose-500" : ""}`}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            {!isAddedToCart ? (
              <Button className="w-full" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg">
                  Continue Shopping
                </Button>
                <Button size="lg">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Checkout
                </Button>
              </div>
            )}
          </div>

          <Tabs defaultValue="manufacturer">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manufacturer">Manufacturer</TabsTrigger>
              <TabsTrigger value="supplier">Supplier</TabsTrigger>
            </TabsList>
            <TabsContent
              value="manufacturer"
              className="p-4 border rounded-md mt-2"
            >
              <div className="space-y-2">
                <h3 className="font-medium">
                  {medicine?.manufacturer?.name || "N/A"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {medicine?.manufacturer?.location || "N/A"}
                </p>
                <p className="text-sm">
                  {medicine?.manufacturer?.contact || "N/A"}
                </p>
              </div>
            </TabsContent>
            <TabsContent
              value="supplier"
              className="p-4 border rounded-md mt-2"
            >
              <div className="space-y-2">
                <h3 className="font-medium">
                  {medicine?.supplier?.name || "N/A"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {medicine?.supplier?.location || "N/A"}
                </p>
                <p className="text-sm">
                  {medicine?.supplier?.contact || "N/A"}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
