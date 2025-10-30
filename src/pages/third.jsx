import React, { useState, useEffect } from 'react';
import {
    X, Briefcase, DollarSign, FileText, AlertCircle, Loader2,
} from 'lucide-react';
import Header from '../components/Header';
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import ApplicantDetailsModal from '../components/ApplicationDetModal';



const PaySkulDashboard = () => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [totalCount, setTotalCount] = useState(0);


    const API_URL = "https://payskul-api.up.railway.app/core/creditworthy-applicants/";

    useEffect(() => {
        fetchApplicants(API_URL);
    }, []);

    const fetchApplicants = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("User not authenticated");

            const response = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error("Unauthorized. Please log in again.");
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setApplicants(data.results || []);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching applicants:", err);
        } finally {
            setLoading(false);
        }
    };


    const handleDownloadPDF = () => {
        if (!selectedApplicant) return;

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Applicant Details", 14, 20);
        doc.setFontSize(12);

        let y = 30;
        const lineSpacing = 8;

        const addLine = (label, value) => {
            doc.text(`${label}: ${value || "N/A"}`, 14, y);
            y += lineSpacing;
        };

        addLine("Applicant ID", selectedApplicant.id);
        addLine("Purpose", selectedApplicant.purpose);
        addLine("Amount Needed", `₦${selectedApplicant.amount_needed}`);
        addLine("Tenor (Months)", selectedApplicant.tenor_in_months);
        addLine("Status", selectedApplicant.status);
        addLine("Date Created", new Date(selectedApplicant.created_at).toLocaleString());

        doc.text("— Employment Details —", 14, (y += 6));
        y += 6;
        addLine("Employer Name", selectedApplicant.employment_details?.employer_name);
        addLine("Office Email", selectedApplicant.employment_details?.office_email);
        addLine("Employment Status", selectedApplicant.employment_details?.employment_status);
        addLine("Office Address", selectedApplicant.employment_details?.office_address);

        doc.text("— Next of Kin —", 14, (y += 6));
        y += 6;
        addLine("Name", selectedApplicant.next_of_kin?.name);
        addLine("Relationship", selectedApplicant.next_of_kin?.relationship);
        addLine("Phone", selectedApplicant.next_of_kin?.phone);

        doc.save(`Applicant_${selectedApplicant.id}.pdf`);
    };

    const getStatusColor = (status) => {
  const colors = {
    pending_credit_check: "bg-yellow-100 text-yellow-800",
    offer_made: "bg-green-100 text-green-800",
    needs_review: "bg-orange-100 text-orange-800",
    approved: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const formatStatus = (status) => {
  switch (status) {
    case "pending_credit_check":
      return "Pending";
    case "offer_made":
      return "Offered";
    case "needs_review":
      return "Review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return "Unknown";
  }
};

// const formatStatus = (status) => {
//   const labels = {
//     pending_credit_check: "Pending",
//     offer_made: "Offered",
//     needs_review: "Review",
//     approved: "Approved",
//     rejected: "Rejected",
//   };
//   return labels[status] || "Unknown";
// };


    // const getStatusColor = (status) => {
    //     const colors = {
    //         pending_credit_check: "bg-yellow-100 text-yellow-800",
    //         offer_made: "bg-green-100 text-green-800",
    //         needs_review: "bg-orange-100 text-orange-800",
    //         approved: "bg-blue-100 text-blue-800",
    //         rejected: "bg-red-100 text-red-800",
    //     };
    //     return colors[status] || "bg-gray-100 text-gray-800";
    // };

    // const formatStatus = (status) =>
    //     status ? status.replace(/_/g, " ").toUpperCase() : "UNKNOWN";

    const formatCurrency = (amount) => {
        const value = parseFloat(amount);
        return isNaN(value) ? "₦0" : `₦${value.toLocaleString()}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleViewDetails = (applicant) => {
        setSelectedApplicant(applicant);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedApplicant(null);
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading applicants...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
                    <div className="flex items-center mb-4">
                        <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                        <h2 className="text-lg font-semibold text-red-900">Error Loading Data</h2>
                    </div>
                    <p className="text-red-700 mb-4">{error}</p>
                    <button
                        onClick={() => fetchApplicants(API_URL)}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition font-medium"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <Header />
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payskul Dashboard</h1>
                    <p className="text-gray-600">Manage loan applications and creditworthy applicants</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-2xl font-bold text-gray-900">{totalCount}</div>
                        <div className="text-sm text-gray-600">Total Applicants</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-2xl font-bold text-gray-900">
                            {applicants.filter(a =>
                                ["pending_credit_check", "needs_review"].includes(a.status)
                            ).length}
                        </div>
                        <div className="text-sm text-gray-600">Pending Review</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-2xl font-bold text-gray-900">
                            {applicants.filter(a => a.status === "approved").length}
                        </div>
                        <div className="text-sm text-gray-600">Approved</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-2xl font-bold text-blue-600">{applicants.length}</div>
                        <div className="text-sm text-gray-600">Currently Displayed</div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Creditworthy Applicants</h2>
                        <button
                            onClick={() => fetchApplicants(API_URL)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            Refresh
                        </button>
                    </div>

                    {applicants.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">No applicants found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Employer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Loan Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Employment
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {applicants.map((applicant) => (
                                        <tr key={applicant.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                #{applicant.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {applicant.employment_details?.employer_name || "N/A"}
                                                <div className="text-sm text-gray-500">
                                                    {applicant.employment_details?.office_email || "—"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {formatCurrency(applicant.amount_needed)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                // className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(applicant.status)}`}
                                                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(applicant.status)}`}
                                                >
                                                    {formatStatus(applicant.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {applicant.employment_details?.employment_status || "N/A"}
                                            </td>
                                            <td className="px-2 py-4 text-xs text-gray-500">
                                                {formatDate(applicant.created_at)}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button
                                                    onClick={() => handleViewDetails(applicant)}
                                                    className="text-purple-600 hover:text-purple-900 font-medium"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                        <button
                            onClick={() => fetchApplicants(prevPage)}
                            disabled={!prevPage}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${prevPage
                                ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => fetchApplicants(nextPage)}
                            disabled={!nextPage}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${nextPage
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* <AnimatePresence> */}
                {showModal && selectedApplicant && (

                    // <motion.div
                    //     key="modal"
                    //     initial={{ opacity: 0 }}
                    //     animate={{ opacity: 1 }}
                    //     exit={{ opacity: 0 }}
                    //     className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center z-50"

                    //   className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50"
                    // >
                    //     <motion.div
                    //         initial={{ y: 40, opacity: 0, scale: 0.95 }}
                    //         animate={{ y: 0, opacity: 1, scale: 1 }}
                    //         exit={{ y: 40, opacity: 0, scale: 0.95 }}
                    //         transition={{ duration: 0.3, ease: "easeInOut" }}
                    //         className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]"
                    //     >
                                                 <ApplicantDetailsModal
    selectedApplicant={selectedApplicant}
    closeModal={closeModal}
  />
                         
                )}
                           
                        {/* </motion.div>
                     </motion.div> */}
            {/* </AnimatePresence> */}


        </div>
    );
};

export default PaySkulDashboard;
