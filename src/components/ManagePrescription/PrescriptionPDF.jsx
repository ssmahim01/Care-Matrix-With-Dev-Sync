import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#2563eb",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1f2937",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: "#6b7280",
    marginRight: 5,
  },
  value: {
    fontSize: 10,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    padding: 5,
    fontSize: 9,
  },
  col1: { width: "25%" },
  col2: { width: "25%" },
  col3: { width: "50%" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#6b7280",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
  },
  signature: {
    marginTop: 50,
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: "40%",
    marginLeft: "auto",
    paddingTop: 5,
    fontSize: 10,
    textAlign: "center",
  },
});

export function PrescriptionPDF({ prescription }) {
  const today = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Medical Prescription</Text>
          <Text style={styles.subtitle}>CareMatrix Health Services</Text>
          <Text style={styles.subtitle}>
            Prescription Date: {prescription.date || today}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Patient Information</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.age} years
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.phone}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.email}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Reason for Visit:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.reason}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Doctor Information</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.doctorName}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Specialty:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.doctorTitle}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Appointment Date:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.date}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Appointment Time:</Text>
                <Text style={styles.value}>
                  {prescription.patientInfo.time}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prescribed Medicines</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.col1]}>Medicine</Text>
              <Text style={[styles.tableCell, styles.col2]}>Frequency</Text>
              <Text style={[styles.tableCell, styles.col3]}>Instructions</Text>
            </View>
            {prescription.medicines.map((medicine, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.col1]}>
                  {medicine.name}
                </Text>
                <Text style={[styles.tableCell, styles.col2]}>
                  {medicine.frequency} times daily
                </Text>
                <Text style={[styles.tableCell, styles.col3]}>
                  {medicine.instructions}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.signature}>
          <Text>{prescription.patientInfo.doctorName}</Text>
          <Text style={{ fontSize: 8 }}>
            {prescription.patientInfo.doctorTitle}
          </Text>
        </View>

        <Text style={styles.footer}>
          This is a computer-generated prescription and does not require a
          physical signature. For any questions, please contact CareMatrix
          Health Services.
        </Text>
      </Page>
    </Document>
  );
}
