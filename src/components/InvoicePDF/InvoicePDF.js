import React from 'react'
// import { createRoot } from 'react-dom/client';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, PDFViewer, Font } from '@react-pdf/renderer';
import { MONTH_MAP } from '../../constants/commonConstants';

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    height: '100%',
    fontSize: 10,
    padding: 20,
    fontFamily: "Open Sans",
  },
  section: {
    marginVertical: 5,
    paddingVertical: 10,
    borderTop: 1,
    borderTopColor: "#000",
    borderBottom: 1,
    borderBottomColor: "#000",
  },
  boldText: {
    fontWeight: "bold",
  },
  header: {
    width: '100%',
    textAlign: 'center',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: 150,
    alignItems: 'center',
  },
  field: {
    display: "flex",
    flexDirection: "row",
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    borderTop: 1,
    borderTopColor: "#000",
    borderBottom: 1,
    borderBottomColor: "#000",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: 1,
    paddingVertical: 5
  },
  nameSection: {
    marginVertical: 5,
    marginTop: 20,
    textAlign: "center"
  },
  headerCell: {
    fontWeight: "extrabold",
  },
  cellOne: {
    width: "5%",
  },
  cellTwo: {
    width: "25%",
  },
  cellThree: {
    width: "25%"
  },
  cellFour: {
    width: "40%"
  },
  totalSection: {
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  }
});

const TableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      <Text style={{ ...styles.headerCell, ...styles.cellOne }}>#</Text>
      <Text style={{ ...styles.headerCell, ...styles.cellTwo }}>Month</Text>
      <Text style={{ ...styles.headerCell, ...styles.cellThree }}>Amount</Text>
      <Text style={{ ...styles.headerCell, ...styles.cellFour }}>Comments</Text>
    </View>
  );
};

const MyDoc = ({
  familyDetails,
  totalAmount,
  memberFeeData,
  date,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={{uri: "Invoice_header.jpeg"}}  style={{
            width: '100%',
            height: '100px'
        }}/>
      </View>
      <View style={styles.section}>
        <View style={styles.field}>
            <Text style={styles.boldText}>Parent / Guardian: </Text><Text> {familyDetails?.family?.familyName}</Text>
        </View>
        <View style={styles.field}>
            <Text style={styles.boldText}>Date: </Text><Text>{date}</Text>
        </View>
      </View>
        {Object.entries(memberFeeData).map(([memberName, feeList], index) => {
            return <View key={index}>
            <View style={styles.nameSection}>
              <Text style={{fontWeight: "bold"}}>Passenger name: {memberName}</Text>
            </View>
            <View style={styles.table}>
              <TableHeader />
              {feeList?.map((fee, feeIndex) => {
                return <View style={styles.tableRow} key={feeIndex}>
                  <Text style={{...styles.cellOne}}>{feeIndex + 1}</Text>
                  <Text style={{...styles.cellTwo}}>{MONTH_MAP[fee?.feeStructure?.month] + " " + fee?.feeStructure?.year}</Text>
                  <Text style={{...styles.cellThree}}>OMR {fee?.pendingAmount}</Text>
                  <Text style={{...styles.cellFour}}></Text>
                </View>
              })}
            </View>
        </View>
        })}
        <View style={styles.totalSection}>
          <Text>Total Amount</Text>
          <Text style={styles.boldText}>OMR {familyDetails?.pendingFamilyDues}</Text>
        </View>
    </Page>
  </Document>
);

function InvoicePDF({
  familyDetails,
  memberFeeData,
  viewMode = true,
  }) {
    // const container = document.getElementById('invoice-pdf');
    // const root = createRoot(container); // createRoot(container!) if you use TypeScript
    // root.render(<PDFViewer><MyDoc/></PDFViewer>);
  const date = new Date;
  if (viewMode) {
    return (
      <PDFViewer><MyDoc familyDetails={familyDetails} memberFeeData={memberFeeData} date={date.getUTCDate() + "-" + MONTH_MAP[Number(date.getUTCMonth() + 1)] + "-" + date.getUTCFullYear()} /></PDFViewer>
    )
  }

  return (
    <PDFDownloadLink document={<MyDoc familyDetails={familyDetails} memberFeeData={memberFeeData} />} fileName={familyDetails?.familyName + ".pdf"}>
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  )
}

export default InvoicePDF