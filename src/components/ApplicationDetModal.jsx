// import React from "react";
// import { X, Briefcase, FileText, User, Download } from "lucide-react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const ApplicantDetailsModal = ({ selectedApplicant, closeModal }) => {
//   if (!selectedApplicant) return null;

//   const {
//     id,
//     sid,
//     amount_needed,
//     tenor_in_months,
//     purpose,
//     status,
//     created_at,
//     credit_report_data,
//     employment_details,
//     next_of_kin,
//   } = selectedApplicant;

//   const formatCurrency = (amount) =>
//     isNaN(parseFloat(amount)) ? "₦0" : `₦${parseFloat(amount).toLocaleString()}`;
//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   // 🧾 PDF Download Function
//   // const handleDownloadPDF = () => {
//   //   const doc = new jsPDF();
//   //   doc.text(`Applicant Details - ID #${id}`, 14, 15);

//   //   // General Info
//   //   autoTable(doc, {
//   //     startY: 25,
//   //     head: [["Field", "Value"]],
//   //     body: [
//   //       ["SID", sid],
//   //       ["Amount Needed", formatCurrency(amount_needed)],
//   //       ["Tenor (months)", tenor_in_months],
//   //       ["Purpose", purpose],
//   //       ["Status", status],
//   //       ["Created At", formatDate(created_at)],
//   //     ],
//   //   });

//   //   // Credit Report
//   //   if (credit_report_data) {
//   //     autoTable(doc, {
//   //       startY: doc.lastAutoTable.finalY + 10,
//   //       head: [["Credit Report", "Value"]],
//   //       body: [
//   //         ["Total Debt", formatCurrency(credit_report_data.debt.total_debt)],
//   //         ["Credit Check", credit_report_data.debt.credit_check ? "Yes" : "No"],
//   //         [
//   //           "Debt by Institution",
//   //           credit_report_data.debt.debt_by_institution
//   //             .map((d) => `${d.institution}: ₦${d.amount_owed}`)
//   //             .join(", "),
//   //         ],
//   //       ],
//   //     });
//   //   }

//   //   // Employment Details
//   //   if (employment_details) {
//   //     autoTable(doc, {
//   //       startY: doc.lastAutoTable.finalY + 10,
//   //       head: [["Employment Detail", "Value"]],
//   //       body: Object.entries(employment_details).map(([key, value]) => [
//   //         key,
//   //         value ? value.toString() : "—",
//   //       ]),
//   //     });
//   //   }

//   //   doc.save(`applicant_${id}.pdf`);
//   // };

//   const handleDownloadPDF = () => {
//   const doc = new jsPDF();
//   doc.text(`Applicant Details - ID #${id}`, 14, 15);

//   // General Info
//   autoTable(doc, {
//     startY: 25,
//     head: [["Field", "Value"]],
//     body: [
//       ["SID", sid],
//       ["Amount Needed", formatCurrency(amount_needed)],
//       ["Tenor (months)", tenor_in_months],
//       ["Purpose", purpose],
//       ["Status", status],
//       ["Created At", formatDate(created_at)],
//     ],
//   });

//   // Credit Report
//   if (credit_report_data) {
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Credit Report", "Value"]],
//       body: [
//         ["Total Debt", formatCurrency(credit_report_data.debt.total_debt)],
//         ["Credit Check", credit_report_data.debt.credit_check ? "Yes" : "No"],
//         [
//           "Debt by Institution",
//           credit_report_data.debt.debt_by_institution
//             .map((d) => `${d.institution}: ₦${d.amount_owed}`)
//             .join(", "),
//         ],
//       ],
//     });
//   }

//   // Employment Details
//   if (employment_details) {
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Employment Detail", "Value"]],
//       body: Object.entries(employment_details).map(([key, value]) => [
//         key,
//         value ? value.toString() : "—",
//       ]),
//     });
//   }

//   // ✅ Next of Kin Details
//   if (next_of_kin) {
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Next of Kin", "Value"]],
//       body: [
//         ["Full Name", next_of_kin.full_name || "—"],
//         ["Relationship", next_of_kin.relationship || "—"],
//         ["Phone Number", next_of_kin.phone_number || "—"],
//         ["Email", next_of_kin.email || "—"],
//         ["Residential Address", next_of_kin.residential_address || "—"],
//         ["Employer Name", next_of_kin.employer_name || "—"],
//       ],
//     });
//   } else {
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Next of Kin", "Value"]],
//       body: [["Next of Kin", "None"]],
//     });
//   }

//   doc.save(`applicant_${id}.pdf`);
// };

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative overflow-y-auto max-h-[90vh]">
//         {/* Close Button */}
//         <button
//           onClick={closeModal}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 p-2">
//           <h2 className="text-2xl font-bold text-gray-900">Applicant Details</h2>
//           <button
//             onClick={handleDownloadPDF}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             <Download className="w-4 h-4" />
//             Download PDF
//           </button>
//         </div>

//         {/* General Info */}
//         <section className="mb-6">
//           <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
//             <FileText className="w-5 h-5 text-blue-600" /> General Information
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//             <p><strong>ID:</strong> #{id}</p>
//             <p><strong>SID:</strong> {sid}</p>
//             <p><strong>Amount Needed:</strong> {formatCurrency(amount_needed)}</p>
//             <p><strong>Tenor:</strong> {tenor_in_months} months</p>
//             <p><strong>Purpose:</strong> {purpose}</p>
//             <p><strong>Status:</strong> {status}</p>
//             <p><strong>Created At:</strong> {formatDate(created_at)}</p>
//           </div>
//         </section>

//         {/* Credit Report */}
//         {credit_report_data && (
//           <section className="mb-6">
//             <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
//               <FileText className="w-5 h-5 text-green-600" /> Credit Report
//             </h3>
//             <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
//               <p>
//                 <strong>Total Debt:</strong>{" "}
//                 {formatCurrency(credit_report_data.debt.total_debt)}
//               </p>
//               <p>
//                 <strong>Credit Check:</strong>{" "}
//                 {credit_report_data.debt.credit_check ? "Yes" : "No"}
//               </p>
//               <div>
//                 <strong>Debt by Institution:</strong>
//                 <ul className="list-disc list-inside ml-4">
//                   {credit_report_data.debt.debt_by_institution.map((d, i) => (
//                     <li key={i}>
//                       {d.institution}: ₦{d.amount_owed.toLocaleString()}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Employment Details */}
//         {employment_details && (
//           <section className="mb-6">
//             <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
//               <Briefcase className="w-5 h-5 text-yellow-600" /> Employment Details
//             </h3>
//             <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//               <p><strong>Employer:</strong> {employment_details.employer_name}</p>
//               <p><strong>Department:</strong> {employment_details.department}</p>
//               <p><strong>Status:</strong> {employment_details.employment_status}</p>
//               <p><strong>Type:</strong> {employment_details.employment_type}</p>
//               <p><strong>Designation:</strong> {employment_details.designation}</p>
//               <p><strong>Office Address:</strong> {employment_details.office_address}</p>
//               <p><strong>Office State:</strong> {employment_details.office_state}</p>
//               <p><strong>Office LGA:</strong> {employment_details.office_lga || "—"}</p>
//               <p><strong>Years in Employment:</strong> {employment_details.time_in_current_employment}</p>
//               <p><strong>Jobs in Last 5 Years:</strong> {employment_details.number_of_jobs_in_last_5_years}</p>
//             </div>
//           </section>
//         )}

//         {/* Next of Kin */}
//         <section>
//           <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
//             <User className="w-5 h-5 text-purple-600" /> Next of Kin
//           </h3>
//           <div className="bg-gray-50 p-4 rounded-lg text-sm">
//             {next_of_kin ? (
//               Object.entries(next_of_kin).map(([key, value]) => (
//                 <p key={key}>
//                   <strong>{key.replace(/_/g, " ")}:</strong> {value || "—"}
//                 </p>
//               ))
//             ) : (
//               <p className="text-gray-500 italic">No next of kin information provided</p>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ApplicantDetailsModal;

// import React from 'react';
// import { X, Download, AlertCircle, DollarSign, Calendar, User, Briefcase, UserCheck, FileText, TrendingDown } from 'lucide-react';

// const ApplicantDetailsModal = ({ selectedApplicant, closeModal, onDownloadPDF }) => {
//   if (!selectedApplicant) return null;

//   const formatCurrency = (amount) => {
//     const value = parseFloat(amount);
//     return isNaN(value) ? "₦0" : `₦${value.toLocaleString()}`;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       pending_credit_check: "bg-yellow-100 text-yellow-800 border-yellow-300",
//       offer_made: "bg-green-100 text-green-800 border-green-300",
//       needs_review: "bg-orange-100 text-orange-800 border-orange-300",
//       approved: "bg-blue-100 text-blue-800 border-blue-300",
//       rejected: "bg-red-100 text-red-800 border-red-300",
//     };
//     return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
//   };

//   const formatStatus = (status) => {
//     const statusMap = {
//       pending_credit_check: "Pending Credit Check",
//       offer_made: "Offer Made",
//       needs_review: "Needs Review",
//       approved: "Approved",
//       rejected: "Rejected",
//     };
//     return statusMap[status] || status;
//   };

//   const hasCredit = selectedApplicant.credit_bureau_report;
//   const canAfford = hasCredit?.summary?.can_afford;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//       <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Applicant Details</h2>
//             <p className="text-sm text-gray-600">Application ID: #{selectedApplicant.id}</p>
//           </div>
//           <div className="flex items-center gap-3">
//             {onDownloadPDF && (
//               <button
//                 onClick={onDownloadPDF}
//                 className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//               >
//                 <Download className="w-4 h-4" />
//                 Download PDF
//               </button>
//             )}
//             <button
//               onClick={closeModal}
//               className="p-2 hover:bg-gray-100 rounded-lg transition"
//             >
//               <X className="w-6 h-6 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Application Status & Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
//               <div className="flex items-center gap-2 mb-2">
//                 <DollarSign className="w-5 h-5 text-purple-600" />
//                 <h3 className="font-semibold text-gray-900">Loan Amount</h3>
//               </div>
//               <p className="text-3xl font-bold text-purple-900">{formatCurrency(selectedApplicant.amount_needed)}</p>
//               <p className="text-sm text-gray-600 mt-1">Purpose: {selectedApplicant.purpose}</p>
//             </div>
            
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
//               <div className="flex items-center gap-2 mb-2">
//                 <Calendar className="w-5 h-5 text-blue-600" />
//                 <h3 className="font-semibold text-gray-900">Application Status</h3>
//               </div>
//               <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(selectedApplicant.status)}`}>
//                 {formatStatus(selectedApplicant.status)}
//               </span>
//               <p className="text-sm text-gray-600 mt-2">Applied: {formatDate(selectedApplicant.created_at)}</p>
//             </div>
//           </div>

//           {/* Credit Bureau Report */}
//           {hasCredit && (
//             <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <TrendingDown className="w-5 h-5 text-red-600" />
//                 <h3 className="text-lg font-bold text-gray-900">Credit Bureau Report</h3>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 <div className="bg-red-50 p-4 rounded-lg border border-red-200">
//                   <p className="text-sm text-gray-600 mb-1">Total Debt</p>
//                   <p className="text-2xl font-bold text-red-900">{formatCurrency(hasCredit.debt?.total_debt)}</p>
//                 </div>
                
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                   <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
//                   <p className="text-2xl font-bold text-blue-900">{formatCurrency(hasCredit.summary?.monthly_payment)}</p>
//                 </div>
                
//                 <div className={`p-4 rounded-lg border ${canAfford ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
//                   <p className="text-sm text-gray-600 mb-1">Affordability</p>
//                   <p className={`text-xl font-bold ${canAfford ? 'text-green-900' : 'text-red-900'}`}>
//                     {canAfford ? 'Can Afford' : 'Cannot Afford'}
//                   </p>
//                 </div>
//               </div>

//               {hasCredit.debt?.debt_by_institution && hasCredit.debt.debt_by_institution.length > 0 && (
//                 <div className="mt-4">
//                   <p className="text-sm font-semibold text-gray-700 mb-2">Debt by Institution:</p>
//                   <div className="space-y-2">
//                     {hasCredit.debt.debt_by_institution.map((debt, index) => (
//                       <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200">
//                         <span className="text-sm font-medium text-gray-900">{debt.institution}</span>
//                         <span className="text-sm font-bold text-red-600">{formatCurrency(debt.amount_owed)}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {hasCredit.months_assessed && (
//                 <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
//                   <strong>Assessment Period:</strong> {formatDate(hasCredit.months_assessed.start)} to {formatDate(hasCredit.months_assessed.end)}
//                 </div>
//               )}
//             </div>
//           )}

//           {!hasCredit && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
//               <div>
//                 <p className="font-semibold text-yellow-900">No Credit Bureau Report Available</p>
//                 <p className="text-sm text-yellow-700 mt-1">Credit check has not been completed for this applicant.</p>
//               </div>
//             </div>
//           )}

//           {/* Loan Terms */}
//           <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <FileText className="w-5 h-5 text-purple-600" />
//               <h3 className="text-lg font-bold text-gray-900">Loan Terms & Conditions</h3>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded border border-gray-200">
//                 <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
//                 <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedApplicant.loan_terms?.loan_amount)}</p>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded border border-gray-200">
//                 <p className="text-sm text-gray-600 mb-1">Tenor</p>
//                 <p className="text-xl font-bold text-gray-900">{selectedApplicant.tenor_in_months} months</p>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded border border-gray-200">
//                 <p className="text-sm text-gray-600 mb-1">Interest Rate (Monthly)</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {selectedApplicant.interest_rate || selectedApplicant.loan_terms?.interest_rate_monthly 
//                     ? `${selectedApplicant.interest_rate || selectedApplicant.loan_terms.interest_rate_monthly}%` 
//                     : 'Not Set'}
//                 </p>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded border border-gray-200">
//                 <p className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {selectedApplicant.loan_terms?.estimated_monthly_payment 
//                     ? formatCurrency(selectedApplicant.loan_terms.estimated_monthly_payment)
//                     : 'Not Calculated'}
//                 </p>
//               </div>
              
//               <div className="bg-purple-50 p-4 rounded border border-purple-200">
//                 <p className="text-sm text-gray-600 mb-1">Total Amount Payable</p>
//                 <p className="text-xl font-bold text-purple-900">
//                   {selectedApplicant.loan_terms?.total_amount_payable 
//                     ? formatCurrency(selectedApplicant.loan_terms.total_amount_payable)
//                     : 'Not Calculated'}
//                 </p>
//               </div>
              
//               <div className="bg-purple-50 p-4 rounded border border-purple-200">
//                 <p className="text-sm text-gray-600 mb-1">Total Interest</p>
//                 <p className="text-xl font-bold text-purple-900">
//                   {selectedApplicant.loan_terms?.total_interest 
//                     ? formatCurrency(selectedApplicant.loan_terms.total_interest)
//                     : 'Not Calculated'}
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-200">
//               <p className="text-sm font-semibold text-gray-700 mb-1">Repayment Method:</p>
//               <p className="text-base font-bold text-blue-900">
//                 {selectedApplicant.loan_terms?.repayment_method || 'Monthly Principal plus Interest'}
//               </p>
//               <p className="text-xs text-gray-600 mt-1">
//                 Code: {selectedApplicant.repayment_method || selectedApplicant.loan_terms?.repayment_method_code || 'monthly_principal_interest'}
//               </p>
//             </div>
//           </div>

//           {/* Personal Information */}
//           <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <User className="w-5 h-5 text-blue-600" />
//               <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
//               <InfoRow label="Full Name" value={`${selectedApplicant.personal_info?.title} ${selectedApplicant.personal_info?.first_name} ${selectedApplicant.personal_info?.last_name}`} />
//               <InfoRow label="Gender" value={selectedApplicant.personal_info?.gender} />
//               <InfoRow label="Date of Birth" value={formatDate(selectedApplicant.personal_info?.date_of_birth)} />
//               <InfoRow label="Marital Status" value={selectedApplicant.personal_info?.marital_status} />
//               <InfoRow label="Education Level" value={selectedApplicant.personal_info?.education_level} />
//               <InfoRow label="State of Origin" value={selectedApplicant.personal_info?.state_of_origin} />
//               <InfoRow label="BVN" value={selectedApplicant.personal_info?.bvn} />
//               <InfoRow label="ID Type" value={selectedApplicant.personal_info?.means_of_identification?.replace('_', ' ')} />
//               <InfoRow label="ID Number" value={selectedApplicant.personal_info?.identification_number} />
//             </div>
//           </div>

//           {/* Contact Details */}
//           <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <User className="w-5 h-5 text-green-600" />
//               <h3 className="text-lg font-bold text-gray-900">Contact Details</h3>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
//               <InfoRow label="Mobile Number" value={selectedApplicant.contact_details?.mobile_no} />
//               <InfoRow label="Email" value={selectedApplicant.contact_details?.personal_email} />
//               <InfoRow label="Home Address" value={selectedApplicant.contact_details?.home_address} />
//               <InfoRow label="State" value={selectedApplicant.contact_details?.state} />
//               <InfoRow label="Building Type" value={selectedApplicant.contact_details?.building} />
//               <InfoRow label="Accommodation" value={selectedApplicant.contact_details?.accommodation_type} />
//               <InfoRow label="Length of Stay" value={`${selectedApplicant.contact_details?.length_of_stay} years`} />
//               <InfoRow label="Closest Bus Stop" value={selectedApplicant.contact_details?.closest_bus_stop} />
//               <InfoRow label="Landmark" value={selectedApplicant.contact_details?.landmark} />
//               <InfoRow label="Spouse Phone" value={selectedApplicant.contact_details?.spouse_phone_no} />
//             </div>
//           </div>

//           {/* Employment Details */}
//           <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <Briefcase className="w-5 h-5 text-orange-600" />
//               <h3 className="text-lg font-bold text-gray-900">Employment Details</h3>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
//               <InfoRow label="Employer Name" value={selectedApplicant.employment_details?.employer_name} />
//               <InfoRow label="Employment Status" value={selectedApplicant.employment_details?.employment_status} />
//               <InfoRow label="Employment Type" value={selectedApplicant.employment_details?.employment_type} />
//               <InfoRow label="Department" value={selectedApplicant.employment_details?.department} />
//               <InfoRow label="Designation" value={selectedApplicant.employment_details?.designation} />
//               <InfoRow label="Staff ID" value={selectedApplicant.employment_details?.staff_id} />
//               <InfoRow label="Office Email" value={selectedApplicant.employment_details?.office_email} />
//               <InfoRow label="Office Address" value={selectedApplicant.employment_details?.office_address} />
//               <InfoRow label="Office State" value={selectedApplicant.employment_details?.office_state} />
//               <InfoRow label="Office LGA" value={selectedApplicant.employment_details?.office_lga} />
//               <InfoRow label="Time in Employment" value={`${selectedApplicant.employment_details?.time_in_current_employment} years`} />
//               <InfoRow 
//                 label="Monthly Net Salary" 
//                 value={selectedApplicant.employment_details?.monthly_net_salary 
//                   ? formatCurrency(selectedApplicant.employment_details.monthly_net_salary)
//                   : 'Not Provided'
//                 }
//                 highlight={true}
//               />
//             </div>
//           </div>

//           {/* Next of Kin */}
//           <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <UserCheck className="w-5 h-5 text-indigo-600" />
//               <h3 className="text-lg font-bold text-gray-900">Next of Kin</h3>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
//               <InfoRow label="Full Name" value={selectedApplicant.next_of_kin?.full_name} />
//               <InfoRow label="Relationship" value={selectedApplicant.next_of_kin?.relationship} />
//               <InfoRow label="Phone Number" value={selectedApplicant.next_of_kin?.phone_number} />
//               <InfoRow label="Email" value={selectedApplicant.next_of_kin?.email} />
//               <InfoRow label="Address" value={selectedApplicant.next_of_kin?.residential_address} />
//               <InfoRow label="Employer" value={selectedApplicant.next_of_kin?.employer_name} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InfoRow = ({ label, value, highlight }) => (
//   <div className={`${highlight ? 'bg-yellow-50 p-2 rounded border border-yellow-200' : ''}`}>
//     <p className="text-sm text-gray-600">{label}</p>
//     <p className={`text-base font-medium ${highlight ? 'text-yellow-900' : 'text-gray-900'}`}>
//       {value || 'N/A'}
//     </p>
//   </div>
// );

// export default ApplicantDetailsModal;



import React from 'react';
import { X, Download, AlertCircle, DollarSign, Calendar, User, Briefcase, UserCheck, FileText, TrendingDown } from 'lucide-react';

const ApplicantDetailsModal = ({ selectedApplicant, closeModal, onDownloadPDF }) => {
  if (!selectedApplicant) return null;

  const formatCurrency = (amount) => {
    const value = parseFloat(amount);
    return isNaN(value) ? "₦0" : `₦${value.toLocaleString()}`;
  };

  const formatCurrencyFromKobo = (amountInKobo) => {
    const value = parseFloat(amountInKobo);
    if (isNaN(value)) return "₦0";
    const amountInNaira = value / 100;
    return `₦${amountInNaira.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending_credit_check: "bg-yellow-100 text-yellow-800 border-yellow-300",
      offer_made: "bg-green-100 text-green-800 border-green-300",
      needs_review: "bg-orange-100 text-orange-800 border-orange-300",
      approved: "bg-blue-100 text-blue-800 border-blue-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const formatStatus = (status) => {
    const statusMap = {
      pending_credit_check: "Pending Credit Check",
      offer_made: "Offer Made",
      needs_review: "Needs Review",
      approved: "Approved",
      rejected: "Rejected",
    };
    return statusMap[status] || status;
  };

  const hasCredit = selectedApplicant.credit_bureau_report;
  const canAfford = hasCredit?.summary?.can_afford;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Applicant Details</h2>
            <p className="text-sm text-gray-600">Application ID: #{selectedApplicant.id}</p>
          </div>
          <div className="flex items-center gap-3">
            {onDownloadPDF && (
              <button
                onClick={onDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            )}
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Application Status & Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Loan Amount</h3>
              </div>
              <p className="text-3xl font-bold text-purple-900">{formatCurrency(selectedApplicant.amount_needed)}</p>
              <p className="text-sm text-gray-600 mt-1">Purpose: {selectedApplicant.purpose}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Application Status</h3>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(selectedApplicant.status)}`}>
                {formatStatus(selectedApplicant.status)}
              </span>
              <p className="text-sm text-gray-600 mt-2">Applied: {formatDate(selectedApplicant.created_at)}</p>
            </div>
          </div>

          {/* Credit Bureau Report */}
          {hasCredit && (
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-gray-900">Credit Bureau Report</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-gray-600 mb-1">Total Debt</p>
                  <p className="text-2xl font-bold text-red-900">{formatCurrencyFromKobo(hasCredit.debt?.total_debt)}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                  <p className="text-2xl font-bold text-blue-900">{formatCurrencyFromKobo(hasCredit.summary?.monthly_payment)}</p>
                </div>
                
                <div className={`p-4 rounded-lg border ${canAfford ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <p className="text-sm text-gray-600 mb-1">Affordability</p>
                  <p className={`text-xl font-bold ${canAfford ? 'text-green-900' : 'text-red-900'}`}>
                    {canAfford ? 'Can Afford' : 'Cannot Afford'}
                  </p>
                </div>
              </div>

              {hasCredit.debt?.debt_by_institution && hasCredit.debt.debt_by_institution.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Debt by Institution:</p>
                  <div className="space-y-2">
                    {hasCredit.debt.debt_by_institution.map((debt, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200">
                        <span className="text-sm font-medium text-gray-900">{debt.institution}</span>
                        <span className="text-sm font-bold text-red-600">{formatCurrencyFromKobo(debt.amount_owed)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasCredit.months_assessed && (
                <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                  <strong>Assessment Period:</strong> {formatDate(hasCredit.months_assessed.start)} to {formatDate(hasCredit.months_assessed.end)}
                </div>
              )}
            </div>
          )}

          {!hasCredit && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">No Credit Bureau Report Available</p>
                <p className="text-sm text-yellow-700 mt-1">Credit check has not been completed for this applicant.</p>
              </div>
            </div>
          )}

          {/* Loan Terms */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">Loan Terms & Conditions</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedApplicant.loan_terms?.loan_amount)}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Tenor</p>
                <p className="text-xl font-bold text-gray-900">{selectedApplicant.tenor_in_months} months</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Interest Rate (Monthly)</p>
                <p className="text-xl font-bold text-gray-900">
                  {selectedApplicant.interest_rate || selectedApplicant.loan_terms?.interest_rate_monthly 
                    ? `${selectedApplicant.interest_rate || selectedApplicant.loan_terms.interest_rate_monthly}%` 
                    : 'Not Set'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</p>
                <p className="text-xl font-bold text-gray-900">
                  {selectedApplicant.loan_terms?.estimated_monthly_payment 
                    ? formatCurrency(selectedApplicant.loan_terms.estimated_monthly_payment)
                    : 'Not Calculated'}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Total Amount Payable</p>
                <p className="text-xl font-bold text-purple-900">
                  {selectedApplicant.loan_terms?.total_amount_payable 
                    ? formatCurrency(selectedApplicant.loan_terms.total_amount_payable)
                    : 'Not Calculated'}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                <p className="text-xl font-bold text-purple-900">
                  {selectedApplicant.loan_terms?.total_interest 
                    ? formatCurrency(selectedApplicant.loan_terms.total_interest)
                    : 'Not Calculated'}
                </p>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-200">
              <p className="text-sm font-semibold text-gray-700 mb-1">Repayment Method:</p>
              <p className="text-base font-bold text-blue-900">
                {selectedApplicant.loan_terms?.repayment_method || 'Monthly Principal plus Interest'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Code: {selectedApplicant.repayment_method || selectedApplicant.loan_terms?.repayment_method_code || 'monthly_principal_interest'}
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <InfoRow label="Full Name" value={`${selectedApplicant.personal_info?.title} ${selectedApplicant.personal_info?.first_name} ${selectedApplicant.personal_info?.last_name}`} />
              <InfoRow label="Gender" value={selectedApplicant.personal_info?.gender} />
              <InfoRow label="Date of Birth" value={formatDate(selectedApplicant.personal_info?.date_of_birth)} />
              <InfoRow label="Marital Status" value={selectedApplicant.personal_info?.marital_status} />
              <InfoRow label="Education Level" value={selectedApplicant.personal_info?.education_level} />
              <InfoRow label="State of Origin" value={selectedApplicant.personal_info?.state_of_origin} />
              <InfoRow label="BVN" value={selectedApplicant.personal_info?.bvn} />
              <InfoRow label="ID Type" value={selectedApplicant.personal_info?.means_of_identification?.replace('_', ' ')} />
              <InfoRow label="ID Number" value={selectedApplicant.personal_info?.identification_number} />
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Contact Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <InfoRow label="Mobile Number" value={selectedApplicant.contact_details?.mobile_no} />
              <InfoRow label="Email" value={selectedApplicant.contact_details?.personal_email} />
              <InfoRow label="Home Address" value={selectedApplicant.contact_details?.home_address} />
              <InfoRow label="State" value={selectedApplicant.contact_details?.state} />
              <InfoRow label="Building Type" value={selectedApplicant.contact_details?.building} />
              <InfoRow label="Accommodation" value={selectedApplicant.contact_details?.accommodation_type} />
              <InfoRow label="Length of Stay" value={`${selectedApplicant.contact_details?.length_of_stay} years`} />
              <InfoRow label="Closest Bus Stop" value={selectedApplicant.contact_details?.closest_bus_stop} />
              <InfoRow label="Landmark" value={selectedApplicant.contact_details?.landmark} />
              <InfoRow label="Spouse Phone" value={selectedApplicant.contact_details?.spouse_phone_no} />
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-900">Employment Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <InfoRow label="Employer Name" value={selectedApplicant.employment_details?.employer_name} />
              <InfoRow label="Employment Status" value={selectedApplicant.employment_details?.employment_status} />
              <InfoRow label="Employment Type" value={selectedApplicant.employment_details?.employment_type} />
              <InfoRow label="Department" value={selectedApplicant.employment_details?.department} />
              <InfoRow label="Designation" value={selectedApplicant.employment_details?.designation} />
              <InfoRow label="Staff ID" value={selectedApplicant.employment_details?.staff_id} />
              <InfoRow label="Office Email" value={selectedApplicant.employment_details?.office_email} />
              <InfoRow label="Office Address" value={selectedApplicant.employment_details?.office_address} />
              <InfoRow label="Office State" value={selectedApplicant.employment_details?.office_state} />
              <InfoRow label="Office LGA" value={selectedApplicant.employment_details?.office_lga} />
              <InfoRow label="Time in Employment" value={`${selectedApplicant.employment_details?.time_in_current_employment} years`} />
              <InfoRow 
                label="Monthly Net Salary" 
                value={selectedApplicant.employment_details?.monthly_net_salary 
                  ? formatCurrency(selectedApplicant.employment_details.monthly_net_salary)
                  : 'Not Provided'
                }
                highlight={true}
              />
            </div>
          </div>

          {/* Next of Kin */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">Next of Kin</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <InfoRow label="Full Name" value={selectedApplicant.next_of_kin?.full_name} />
              <InfoRow label="Relationship" value={selectedApplicant.next_of_kin?.relationship} />
              <InfoRow label="Phone Number" value={selectedApplicant.next_of_kin?.phone_number} />
              <InfoRow label="Email" value={selectedApplicant.next_of_kin?.email} />
              <InfoRow label="Address" value={selectedApplicant.next_of_kin?.residential_address} />
              <InfoRow label="Employer" value={selectedApplicant.next_of_kin?.employer_name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, highlight }) => (
  <div className={`${highlight ? 'bg-yellow-50 p-2 rounded border border-yellow-200' : ''}`}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`text-base font-medium ${highlight ? 'text-yellow-900' : 'text-gray-900'}`}>
      {value || 'N/A'}
    </p>
  </div>
);

export default ApplicantDetailsModal;