import { Button } from "@/components/ui/button";
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
  Font
} from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { styles } from "./invoice";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authActions";


// Register the custom font
Font.register({
    family: "NotoSansBengali",
    src: "/fonts/NotoSansBengali-Regular.ttf", 
  });

const InvoicePDF = ({ invoice = {}, user = {} }) => (
  <Document pageLayout="singlePage">
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.spaceY}>
          <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
          <Text>
            Invoice - INV-2025-
            {invoice?.transactionId
              ?.substring(invoice.transactionId.length - 3)
              .toUpperCase() || "N/A"}
          </Text>
        </View>
        <View style={[styles.spaceY, styles.textRight]}>
          <Image
            src="https://i.ibb.co.com/0p51x7fq/care-matrix-logo-mainlogo.png"
            style={{ width: 100 }}
          />
          <Text>Bashundhara R/A </Text>
          <Text>Dhaka, Bangladesh</Text>
        </View>
      </View>

      {/* Bill To Section */}
      <View style={styles.spaceY}>
        <Text style={[styles.textBold, styles.billTo]}>Bill To</Text>
        <Text>{invoice?.customerInfo?.name || user?.displayName || "N/A"}</Text>
        <Text>{invoice?.customerInfo?.address || "N/A"}</Text>
        {/* <Text>
          {invoice?.customerInfo?.district || "N/A"},{" "}
          {invoice?.customerInfo?.division || "N/A"}, Bangladesh
        </Text> */}
      </View>

      {/* Table of Ordered Items (Manual Implementation) */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableHeader, { flexDirection: "row" }]}>
          <Text style={[styles.td, { flex: 3 }]}>Description</Text>
          <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>Quantity</Text>
          <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>Unit Price</Text>
          <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>Total</Text>
        </View>
        {/* Table Rows */}
        {invoice?.orderedItems?.length > 0 ? (
          invoice.orderedItems.map((item, i) => (
            <View key={i} style={{ flexDirection: "row" }}>
              <Text style={[styles.td, { flex: 3 }]}>{item.name || "N/A"}</Text>
              <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>{item.quantity || 0}</Text>
              <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>Tk {item.unitPrice || 0}</Text>
              <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>Tk {item.totalPrice || 0}</Text>
            </View>
          ))
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.td, { flex: 1 }]}>No items found</Text>
          </View>
        )}
      </View>

      {/* Subtotal Section */}
      <View style={{ display: "flex", alignItems: "flex-end" }}>
        <View style={{ minWidth: "200px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text>Subtotal</Text>
            <Text>Tk {invoice?.totalPrice || 0}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

function Invoice() {
  const { invoiceId } = useParams();
  const user = useAuthUser();
  const axiosSecure = useAxiosSecure();

  const { data: invoice = {}, isLoading, error } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/purchase/invoice/${invoiceId}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <p>Loading invoice...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <p>Error loading invoice: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[80vh] max-w-3xl mx-auto ">
      <PDFViewer width="100%" height="100%">
        <InvoicePDF user={user} invoice={invoice} />
      </PDFViewer>
      <div className="mt-8">
        <PDFDownloadLink
          document={<InvoicePDF user={user} invoice={invoice} />}
          fileName={`invoice-${invoiceId}.pdf`}
        >
          <Button>Download PDF</Button>
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default Invoice;