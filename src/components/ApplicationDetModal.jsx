import React from "react";
import { X, Briefcase, FileText, User, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ApplicantDetailsModal = ({ selectedApplicant, closeModal }) => {
  if (!selectedApplicant) return null;

  const {
    id,
    sid,
    amount_needed,
    tenor_in_months,
    purpose,
    status,
    created_at,
    credit_report_data,
    employment_details,
    next_of_kin,
  } = selectedApplicant;

  const formatCurrency = (amount) =>
    isNaN(parseFloat(amount)) ? "₦0" : `₦${parseFloat(amount).toLocaleString()}`;
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 🧾 PDF Download Function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Applicant Details - ID #${id}`, 14, 15);

    // General Info
    autoTable(doc, {
      startY: 25,
      head: [["Field", "Value"]],
      body: [
        ["SID", sid],
        ["Amount Needed", formatCurrency(amount_needed)],
        ["Tenor (months)", tenor_in_months],
        ["Purpose", purpose],
        ["Status", status],
        ["Created At", formatDate(created_at)],
      ],
    });

    // Credit Report
    if (credit_report_data) {
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Credit Report", "Value"]],
        body: [
          ["Total Debt", formatCurrency(credit_report_data.debt.total_debt)],
          ["Credit Check", credit_report_data.debt.credit_check ? "Yes" : "No"],
          [
            "Debt by Institution",
            credit_report_data.debt.debt_by_institution
              .map((d) => `${d.institution}: ₦${d.amount_owed}`)
              .join(", "),
          ],
        ],
      });
    }

    // Employment Details
    if (employment_details) {
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Employment Detail", "Value"]],
        body: Object.entries(employment_details).map(([key, value]) => [
          key,
          value ? value.toString() : "—",
        ]),
      });
    }

    doc.save(`applicant_${id}.pdf`);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex justify-between items-center mb-6 p-2">
          <h2 className="text-2xl font-bold text-gray-900">Applicant Details</h2>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* General Info */}
        <section className="mb-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
            <FileText className="w-5 h-5 text-blue-600" /> General Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <p><strong>ID:</strong> #{id}</p>
            <p><strong>SID:</strong> {sid}</p>
            <p><strong>Amount Needed:</strong> {formatCurrency(amount_needed)}</p>
            <p><strong>Tenor:</strong> {tenor_in_months} months</p>
            <p><strong>Purpose:</strong> {purpose}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Created At:</strong> {formatDate(created_at)}</p>
          </div>
        </section>

        {/* Credit Report */}
        {credit_report_data && (
          <section className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
              <FileText className="w-5 h-5 text-green-600" /> Credit Report
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
              <p>
                <strong>Total Debt:</strong>{" "}
                {formatCurrency(credit_report_data.debt.total_debt)}
              </p>
              <p>
                <strong>Credit Check:</strong>{" "}
                {credit_report_data.debt.credit_check ? "Yes" : "No"}
              </p>
              <div>
                <strong>Debt by Institution:</strong>
                <ul className="list-disc list-inside ml-4">
                  {credit_report_data.debt.debt_by_institution.map((d, i) => (
                    <li key={i}>
                      {d.institution}: ₦{d.amount_owed.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Employment Details */}
        {employment_details && (
          <section className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
              <Briefcase className="w-5 h-5 text-yellow-600" /> Employment Details
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p><strong>Employer:</strong> {employment_details.employer_name}</p>
              <p><strong>Department:</strong> {employment_details.department}</p>
              <p><strong>Status:</strong> {employment_details.employment_status}</p>
              <p><strong>Type:</strong> {employment_details.employment_type}</p>
              <p><strong>Designation:</strong> {employment_details.designation}</p>
              <p><strong>Office Address:</strong> {employment_details.office_address}</p>
              <p><strong>Office State:</strong> {employment_details.office_state}</p>
              <p><strong>Office LGA:</strong> {employment_details.office_lga || "—"}</p>
              <p><strong>Years in Employment:</strong> {employment_details.time_in_current_employment}</p>
              <p><strong>Jobs in Last 5 Years:</strong> {employment_details.number_of_jobs_in_last_5_years}</p>
            </div>
          </section>
        )}

        {/* Next of Kin */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
            <User className="w-5 h-5 text-purple-600" /> Next of Kin
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg text-sm">
            {next_of_kin ? (
              Object.entries(next_of_kin).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace(/_/g, " ")}:</strong> {value || "—"}
                </p>
              ))
            ) : (
              <p className="text-gray-500 italic">No next of kin information provided</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplicantDetailsModal;
