import * as XLSX from "xlsx";

export function exportEnquiries(data) {
  if (!data.length) return;

  const exportData = data.map((item) => ({
    Name: item.name,
    Phone: item.phone,
    Email: item.email,
    City: item.city,
    Message: item.message,
    Date:
      item.createdAt && item.createdAt.toDate
        ? item.createdAt.toDate().toLocaleString()
        : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

  XLSX.writeFile(workbook, "Wood-Art-Enquiries.xlsx");
}
