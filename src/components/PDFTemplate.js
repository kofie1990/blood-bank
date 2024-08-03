import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';

const PDFTemplate = ({ data }) => {

  return (
    <Document>
      <Page size="A4" className="bg-gray-200 p-12">
        <View className="flex flex-col space-y-4">
          <Text className="text-2xl font-bold text-gray-800">Blood Donation Report</Text>
          <Text className="text-base text-gray-600">Donor Name: {data.donorName}</Text>
          <Text className="text-base text-gray-600">Blood Type: {data.bloodType}</Text>
          <Text className="text-base text-gray-600">Donation Date: {data.donationDate}</Text>
          <Text className="text-base text-gray-600">Amount: {data.amount} ml</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate;
