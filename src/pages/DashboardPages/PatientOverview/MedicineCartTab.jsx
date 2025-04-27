import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import EmptyState from "./EmptyState";

const MedicineCartTab = ({ medicineCart, formatCurrency, overviewStats }) => {
  return (
    <Card
      className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
    >
      {medicineCart && medicineCart.length > 0 && (
        <CardHeader>
          <CardTitle>View Cart</CardTitle>
          <CardDescription>Items Currently In Your Cart</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        {medicineCart && medicineCart.length > 0 ? (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicineCart?.map((item) => (
                  <TableRow key={item?._id || Math.random().toString()}>
                    <TableCell className="font-medium">
                      {item?.medicineName || "N/A"}
                    </TableCell>
                    <TableCell>{formatCurrency(item?.price) || 0}</TableCell>
                    <TableCell>{item?.quantity || 0}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        (item?.price || 0) * (item?.quantity || 0)
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm font-medium">
                  Total Items: {overviewStats?.itemsInCart || 0}
                </p>
                <p className="text-sm font-medium">
                  Total:{" "}
                  {formatCurrency(
                    medicineCart?.reduce(
                      (sum, item) =>
                        sum + (item?.price || 0) * (item?.quantity || 0),
                      0
                    )
                  )}
                </p>
              </div>
              <Link to="/dashboard/patient/manage-cart">
                <Button className={"cursor-pointer"}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={ShoppingBag}
            title="Your Cart Is Empty"
            description="You haven't added any medicines to your cart yet. Browse our pharmacy to find what you need."
            actionLabel="Browse Medicines"
            actionLink="/pharmacy"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MedicineCartTab;
