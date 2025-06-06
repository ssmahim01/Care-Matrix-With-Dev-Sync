import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  fieldRow: {
    flexDirection: "row",
    gap: "24px",
    borderBottom: "1px solid #e5e5e5",
    paddingVertical: 6,
  },
  label: {
    color: "#6b7280",
    width: "30%",
  },
  value: {
    color: "#111827",
    fontWeight: "medium",
  },
});

// Register the custom font
Font.register({
  family: "NotoSansBengali",
  src: "/fonts/NotoSansBengali-Regular.ttf",
});

const AppointmentInvoice = ({ paymentInfo, rewardInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Appointment Invoice</Text>
          <Text>CareMatrix</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Image
            src="https://i.ibb.co.com/0p51x7fq/care-matrix-logo-mainlogo.png"
            style={{ width: 100 }}
          />
          <Text>Mirpur-10</Text>
          <Text>Dhaka, Bangladesh</Text>
        </View>
      </View>

      {/* Payment Details */}
      <Text style={styles.sectionTitle}>Payment Details</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Transaction ID:</Text>
        <Text style={styles.value}>{paymentInfo.transactionId}</Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>Tk {paymentInfo.amount}</Text>
      </View>

      {
        paymentInfo?.appointmentInfo?.rewardInfo?.discount > 0 &&
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Reward Discount:</Text>
          <Text style={styles.value}>{paymentInfo?.appointmentInfo?.rewardInfo?.discount}%</Text>
        </View>
      }

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Payment Date:</Text>
        <Text style={styles.value}>
          {paymentInfo.paymentDate.replace("T", ", ").slice(0, -5)}
        </Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>Successful</Text>
      </View>

      {/* Appointment Info */}
      <Text style={styles.sectionTitle}>Appointment Info</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>
          {paymentInfo?.appointmentInfo?.doctorName}
        </Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Patient Name:</Text>
        <Text style={styles.value}>{paymentInfo?.appointmentInfo?.name}</Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Serial Number:</Text>
        <Text style={styles.value}>{paymentInfo?.appointmentInfo?.serialNumber}</Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{paymentInfo?.appointmentInfo?.age}</Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{paymentInfo?.appointmentInfo?.date}</Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{paymentInfo?.appointmentInfo?.time}</Text>
      </View>

      {/* Reward Info */}
      <Text style={styles.sectionTitle}>Reward Info</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Award Point:</Text>
        <Text style={styles.value}>{rewardInfo?.points}</Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Action:</Text>
        <Text style={styles.value}>{rewardInfo?.action}</Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Awarded Date:</Text>
        <Text style={styles.value}>
          Awarded Date:{" "}
          {rewardInfo?.date
            ? new Date(rewardInfo.date).toDateString("en-UK")
            : "N/A"}
        </Text>
      </View>
    </Page>
  </Document>
);

export default AppointmentInvoice;
