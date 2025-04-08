import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";

const logoUrl =
  "https://i.ibb.co.com/NgjF57xt/care-matrix-logo-Copy-removebg-preview.png";

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 176,
    height: 54,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  tableContainer: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    borderBottomStyle: "solid",
  },
  tableHeader: {
    backgroundColor: "#e5e7eb",
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
    padding: 6,
    flex: 1,
    textAlign: "left",
  },
  tableCell: {
    fontSize: 10,
    padding: 6,
    flex: 1,
    textAlign: "left",
    color: "black",
  },
  caption: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 5,
  },
});

const RevenueByDayPDF = ({ sortedRevenueData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header  */}
      <View style={styles.header}>
        <Image style={styles.logo} src={logoUrl} />
        <Text style={styles.title}>Sales Report - Revenue by Day</Text>
      </View>

      {/* Table */}
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader]}>Date</Text>
            <Text style={[styles.tableHeader]}>Items Sold</Text>
            <Text style={[styles.tableHeader]}>Revenue</Text>
            <Text style={[styles.tableHeader]}>Avg Item Value</Text>
            <Text style={[styles.tableHeader]}>Estimated Tax (10%)</Text>
            <Text style={[styles.tableHeader]}>Net Revenue</Text>
          </View>
          {/* Data Rows */}
          {sortedRevenueData.map((day) => {
            const avgItemValue = day?.totalRevenue / day?.totalQty;
            const tax = day?.totalRevenue * 0.1;
            const netRevenue = day?.totalRevenue - tax;
            return (
              <View style={styles.tableRow} key={day?.date}>
                <Text style={styles.tableCell}>
                  {format(new Date(day?.date), "MMM dd, yyyy")}
                </Text>
                <Text style={styles.tableCell}>{day?.totalQty} items</Text>
                <Text style={styles.tableCell}>
                  Tk{" "}
                  {day?.totalRevenue.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <Text style={styles.tableCell}>
                  Tk{" "}
                  {avgItemValue?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <Text style={styles.tableCell}>
                  Tk{" "}
                  {tax?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <Text style={styles.tableCell}>
                  Tk{" "}
                  {netRevenue?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            );
          })}
        </View>
        {/* Caption */}
        <Text style={styles.caption}>A List Of Revenue By Day</Text>
      </View>
    </Page>
  </Document>
);

export default RevenueByDayPDF;
