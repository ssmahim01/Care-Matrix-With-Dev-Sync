import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: "12",
    padding: "30px 50px",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
    fontWeight: "bold",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  textRight: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "right",
  },
  billTo: {
    marginBottom: "5px",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#d5d8dc",
    margin: "20px 0",
  },
  tableHeader: {
    backgroundColor: "#e5e5e5",
    borderBottomWidth: 1, // Explicitly set border for header
    borderStyle: "solid",
    borderColor: "#d5d8dc",
  },
  td: {
    padding: 6,
    borderWidth: 1, // Explicitly set border for table cells
    borderStyle: "solid",
    borderColor: "#d5d8dc",
  },
});