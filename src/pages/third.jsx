import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader2} from 'lucide-react';
import Header from '../components/Header';
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


    // const handleDownloadPDF = () => {
    //     if (!selectedApplicant) return;

    //     const doc = new jsPDF();
    //     doc.setFontSize(16);
    //     doc.text("Applicant Details", 14, 20);
    //     doc.setFontSize(12);

    //     let y = 30;
    //     const lineSpacing = 8;

    //     const addLine = (label, value) => {
    //         doc.text(`${label}: ${value || "N/A"}`, 14, y);
    //         y += lineSpacing;
    //     };

    //     addLine("Applicant ID", selectedApplicant.id);
    //     addLine("Purpose", selectedApplicant.purpose);
    //     addLine("Amount Needed", `₦${selectedApplicant.amount_needed}`);
    //     addLine("Tenor (Months)", selectedApplicant.tenor_in_months);
    //     addLine("Status", selectedApplicant.status);
    //     addLine("Date Created", new Date(selectedApplicant.created_at).toLocaleString());

    //     doc.text("— Employment Details —", 14, (y += 6));
    //     y += 6;
    //     addLine("Employer Name", selectedApplicant.employment_details?.employer_name);
    //     addLine("Office Email", selectedApplicant.employment_details?.office_email);
    //     addLine("Employment Status", selectedApplicant.employment_details?.employment_status);
    //     addLine("Office Address", selectedApplicant.employment_details?.office_address);

    //     doc.text("— Next of Kin —", 14, (y += 6));
    //     y += 6;
    //     addLine("Name", selectedApplicant.next_of_kin?.name);
    //     addLine("Relationship", selectedApplicant.next_of_kin?.relationship);
    //     addLine("Phone", selectedApplicant.next_of_kin?.phone);

    //     doc.save(`Applicant_${selectedApplicant.id}.pdf`);
    // };

    
// const handleDownloadPDF = (selectedApplicant) => {
//     if (!selectedApplicant) return;

//     const doc = new jsPDF();
//     let y = 20;
//     const lineSpacing = 7;
//     const sectionSpacing = 10;
//     const pageHeight = doc.internal.pageSize.height;
//     const margin = 20;

//     // Helper function to check if we need a new page
//     const checkPageBreak = (spaceNeeded = 10) => {
//         if (y + spaceNeeded > pageHeight - margin) {
//             doc.addPage();
//             y = 20;
//             return true;
//         }
//         return false;
//     };

//     // Helper function to format currency
//     const formatCurrency = (amount) => {
//         const value = parseFloat(amount);
//         return isNaN(value) ? "₦0" : `₦${value.toLocaleString()}`;
//     };

//     // Helper function to format currency from kobo
//     const formatCurrencyFromKobo = (amountInKobo) => {
//         const value = parseFloat(amountInKobo);
//         if (isNaN(value)) return "₦0";
//         const amountInNaira = value / 100;
//         return `₦${amountInNaira.toLocaleString()}`;
//     };

//     // Helper function to format date
//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         return new Date(dateString).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         });
//     };

//     // Helper function to add a line
//     const addLine = (label, value, bold = false) => {
//         checkPageBreak();
//         if (bold) {
//             doc.setFont(undefined, 'bold');
//         }
//         doc.text(`${label}: ${value || "N/A"}`, 14, y);
//         if (bold) {
//             doc.setFont(undefined, 'normal');
//         }
//         y += lineSpacing;
//     };

//     // Helper function to add section header
//     const addSectionHeader = (title) => {
//         checkPageBreak(15);
//         y += sectionSpacing;
//         doc.setFontSize(14);
//         doc.setFont(undefined, 'bold');
//         doc.text(title, 14, y);
//         doc.setFont(undefined, 'normal');
//         doc.setFontSize(11);
//         y += lineSpacing + 2;
//     };

//     // Title
//     doc.setFontSize(18);
//     doc.setFont(undefined, 'bold');
//     doc.text("Loan Application Report", 14, y);
//     doc.setFont(undefined, 'normal');
//     y += 10;

//     // Application Overview
//     doc.setFontSize(11);
//     addLine("Application ID", `#${selectedApplicant.id}`, true);
//     addLine("Date Created", formatDate(selectedApplicant.created_at));
//     addLine("Status", selectedApplicant.status?.replace('_', ' ').toUpperCase());
    
//     // Loan Request Details
//     addSectionHeader("Loan Request Details");
//     addLine("Loan Amount", formatCurrency(selectedApplicant.amount_needed));
//     addLine("Purpose", selectedApplicant.purpose);
//     addLine("Tenor", `${selectedApplicant.tenor_in_months} months`);

//     // Credit Bureau Report
//     if (selectedApplicant.credit_bureau_report) {
//         const credit = selectedApplicant.credit_bureau_report;
//         addSectionHeader("Credit Bureau Report");
        
//         addLine("Total Debt", formatCurrencyFromKobo(credit.debt?.total_debt));
//         addLine("Monthly Payment Obligation", formatCurrencyFromKobo(credit.summary?.monthly_payment));
//         addLine("Can Afford Loan", credit.summary?.can_afford ? "YES" : "NO", true);
        
//         if (credit.months_assessed) {
//             addLine("Assessment Period", `${formatDate(credit.months_assessed.start)} to ${formatDate(credit.months_assessed.end)}`);
//         }
        
//         if (credit.debt?.debt_by_institution && credit.debt.debt_by_institution.length > 0) {
//             checkPageBreak(15);
//             y += 3;
//             doc.setFont(undefined, 'bold');
//             doc.text("Debt Breakdown by Institution:", 14, y);
//             doc.setFont(undefined, 'normal');
//             y += lineSpacing;
            
//             credit.debt.debt_by_institution.forEach((debt) => {
//                 checkPageBreak();
//                 doc.text(`  • ${debt.institution}: ${formatCurrencyFromKobo(debt.amount_owed)}`, 14, y);
//                 y += lineSpacing;
//             });
//         }
//     } else {
//         addSectionHeader("Credit Bureau Report");
//         doc.setTextColor(200, 100, 0);
//         doc.text("No credit bureau report available", 14, y);
//         doc.setTextColor(0, 0, 0);
//         y += lineSpacing;
//     }

//     // Loan Terms & Conditions
//     addSectionHeader("Loan Terms & Conditions");
//     const loanTerms = selectedApplicant.loan_terms;
//     addLine("Loan Amount", formatCurrency(loanTerms?.loan_amount));
//     addLine("Tenor", `${selectedApplicant.tenor_in_months} months`);
//     addLine("Interest Rate (Monthly)", 
//         selectedApplicant.interest_rate || loanTerms?.interest_rate_monthly 
//             ? `${selectedApplicant.interest_rate || loanTerms.interest_rate_monthly}%` 
//             : 'Not Set'
//     );
//     addLine("Repayment Method", loanTerms?.repayment_method || "Monthly Principal plus Interest");
//     addLine("Estimated Monthly Payment", 
//         loanTerms?.estimated_monthly_payment 
//             ? formatCurrency(loanTerms.estimated_monthly_payment)
//             : 'Not Calculated'
//     );
//     addLine("Total Amount Payable", 
//         loanTerms?.total_amount_payable 
//             ? formatCurrency(loanTerms.total_amount_payable)
//             : 'Not Calculated'
//     );
//     addLine("Total Interest", 
//         loanTerms?.total_interest 
//             ? formatCurrency(loanTerms.total_interest)
//             : 'Not Calculated'
//     );

//     // Personal Information
//     addSectionHeader("Personal Information");
//     const personal = selectedApplicant.personal_info;
//     addLine("Full Name", `${personal?.title} ${personal?.first_name} ${personal?.last_name}`);
//     addLine("Gender", personal?.gender);
//     addLine("Date of Birth", formatDate(personal?.date_of_birth));
//     addLine("Marital Status", personal?.marital_status);
//     addLine("Education Level", personal?.education_level);
//     addLine("State of Origin", personal?.state_of_origin);
//     addLine("BVN", personal?.bvn);
//     addLine("Means of Identification", personal?.means_of_identification?.replace('_', ' '));
//     addLine("Identification Number", personal?.identification_number);

//     // Contact Details
//     addSectionHeader("Contact Details");
//     const contact = selectedApplicant.contact_details;
//     addLine("Mobile Number", contact?.mobile_no);
//     addLine("Personal Email", contact?.personal_email);
//     addLine("Home Address", contact?.home_address);
//     addLine("State", contact?.state);
//     addLine("Building Type", contact?.building);
//     addLine("Accommodation Type", contact?.accommodation_type);
//     addLine("Length of Stay", contact?.length_of_stay ? `${contact.length_of_stay} years` : 'N/A');
//     addLine("Closest Bus Stop", contact?.closest_bus_stop);
//     addLine("Landmark", contact?.landmark);
//     addLine("Route Details", contact?.route_details);
//     if (contact?.spouse_phone_no) {
//         addLine("Spouse Phone Number", contact.spouse_phone_no);
//     }
//     if (contact?.referee_name) {
//         addLine("Referee Name", contact.referee_name);
//         addLine("Referee Phone", contact.referee_phone_no);
//     }

//     // Employment Details
//     addSectionHeader("Employment Details");
//     const employment = selectedApplicant.employment_details;
//     addLine("Employer Name", employment?.employer_name);
//     addLine("Employment Status", employment?.employment_status);
//     addLine("Employment Type", employment?.employment_type);
//     addLine("Department", employment?.department);
//     addLine("Designation", employment?.designation);
//     addLine("Staff ID", employment?.staff_id);
//     addLine("Tax ID", employment?.tax_id);
//     addLine("Office Email", employment?.office_email);
//     addLine("Office Address", employment?.office_address);
//     addLine("Office State", employment?.office_state);
//     addLine("Office LGA", employment?.office_lga);
//     addLine("Time in Current Employment", employment?.time_in_current_employment ? `${employment.time_in_current_employment} years` : 'N/A');
//     addLine("Number of Jobs in Last 5 Years", employment?.number_of_jobs_in_last_5_years);
//     addLine("Monthly Net Salary", 
//         employment?.monthly_net_salary 
//             ? formatCurrency(employment.monthly_net_salary)
//             : 'Not Provided',
//         true
//     );

//     // Next of Kin
//     addSectionHeader("Next of Kin Information");
//     const kin = selectedApplicant.next_of_kin;
//     addLine("Full Name", kin?.full_name);
//     addLine("Relationship", kin?.relationship);
//     addLine("Phone Number", kin?.phone_number);
//     addLine("Email", kin?.email);
//     addLine("Residential Address", kin?.residential_address);
//     addLine("Employer Name", kin?.employer_name);

//     // Footer
//     checkPageBreak(15);
//     y += 10;
//     doc.setFontSize(9);
//     doc.setTextColor(128, 128, 128);
//     doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, y);
//     doc.text(`Payskul Application Report - Confidential`, 14, y + 5);

//     // Save the PDF
//     doc.save(`Applicant_${selectedApplicant.id}_Complete_Report.pdf`);
// };

// Replace the handleDownloadPDF function in your PaySkulDashboard component with this:

const handleDownloadPDF = (applicant) => {
    if (!applicant) return;

    const doc = new jsPDF();
    let y = 20;
    const lineSpacing = 7;
    const sectionSpacing = 10;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    // Helper function to check if we need a new page
    const checkPageBreak = (spaceNeeded = 10) => {
        if (y + spaceNeeded > pageHeight - margin) {
            doc.addPage();
            y = 20;
            return true;
        }
        return false;
    };

    // Helper function to format currency
    const formatCurrency = (amount) => {
        const value = parseFloat(amount);
        return isNaN(value) ? "₦0" : `₦${value.toLocaleString()}`;
    };

    // Helper function to format currency from kobo
    const formatCurrencyFromKobo = (amountInKobo) => {
        const value = parseFloat(amountInKobo);
        if (isNaN(value)) return "₦0";
        const amountInNaira = value / 100;
        return `₦${amountInNaira.toLocaleString()}`;
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Helper function to add a line
    const addLine = (label, value, bold = false) => {
        checkPageBreak();
        if (bold) {
            doc.setFont(undefined, 'bold');
        }
        doc.text(`${label}: ${value || "N/A"}`, 14, y);
        if (bold) {
            doc.setFont(undefined, 'normal');
        }
        y += lineSpacing;
    };

    // Helper function to add section header
    const addSectionHeader = (title) => {
        checkPageBreak(15);
        y += sectionSpacing;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(title, 14, y);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(11);
        y += lineSpacing + 2;
    };

    // Title
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text("Loan Application Report", 14, y);
    doc.setFont(undefined, 'normal');
    y += 10;

    // Application Overview
    doc.setFontSize(11);
    addLine("Application ID", `#${applicant.id}`, true);
    addLine("Date Created", formatDate(applicant.created_at));
    addLine("Status", applicant.status?.replace('_', ' ').toUpperCase());
    
    // Loan Request Details
    addSectionHeader("Loan Request Details");
    addLine("Loan Amount", formatCurrency(applicant.amount_needed));
    addLine("Purpose", applicant.purpose);
    addLine("Tenor", `${applicant.tenor_in_months} months`);

    // Credit Bureau Report
    if (applicant.credit_bureau_report) {
        const credit = applicant.credit_bureau_report;
        addSectionHeader("Credit Bureau Report");
        
        addLine("Total Debt", formatCurrencyFromKobo(credit.debt?.total_debt));
        addLine("Monthly Payment Obligation", formatCurrencyFromKobo(credit.summary?.monthly_payment));
        addLine("Can Afford Loan", credit.summary?.can_afford ? "YES" : "NO", true);
        
        if (credit.months_assessed) {
            addLine("Assessment Period", `${formatDate(credit.months_assessed.start)} to ${formatDate(credit.months_assessed.end)}`);
        }
        
        if (credit.debt?.debt_by_institution && credit.debt.debt_by_institution.length > 0) {
            checkPageBreak(15);
            y += 3;
            doc.setFont(undefined, 'bold');
            doc.text("Debt Breakdown by Institution:", 14, y);
            doc.setFont(undefined, 'normal');
            y += lineSpacing;
            
            credit.debt.debt_by_institution.forEach((debt) => {
                checkPageBreak();
                doc.text(`  • ${debt.institution}: ${formatCurrencyFromKobo(debt.amount_owed)}`, 14, y);
                y += lineSpacing;
            });
        }
    } else {
        addSectionHeader("Credit Bureau Report");
        doc.setTextColor(200, 100, 0);
        doc.text("No credit bureau report available", 14, y);
        doc.setTextColor(0, 0, 0);
        y += lineSpacing;
    }

    // Loan Terms & Conditions
    addSectionHeader("Loan Terms & Conditions");
    const loanTerms = applicant.loan_terms;
    addLine("Loan Amount", formatCurrency(loanTerms?.loan_amount));
    addLine("Tenor", `${applicant.tenor_in_months} months`);
    addLine("Interest Rate (Monthly)", 
        applicant.interest_rate || loanTerms?.interest_rate_monthly 
            ? `${applicant.interest_rate || loanTerms.interest_rate_monthly}%` 
            : 'Not Set'
    );
    addLine("Repayment Method", loanTerms?.repayment_method || "Monthly Principal plus Interest");
    addLine("Estimated Monthly Payment", 
        loanTerms?.estimated_monthly_payment 
            ? formatCurrency(loanTerms.estimated_monthly_payment)
            : 'Not Calculated'
    );
    addLine("Total Amount Payable", 
        loanTerms?.total_amount_payable 
            ? formatCurrency(loanTerms.total_amount_payable)
            : 'Not Calculated'
    );
    addLine("Total Interest", 
        loanTerms?.total_interest 
            ? formatCurrency(loanTerms.total_interest)
            : 'Not Calculated'
    );

    // Personal Information
    addSectionHeader("Personal Information");
    const personal = applicant.personal_info;
    addLine("Full Name", `${personal?.title} ${personal?.first_name} ${personal?.last_name}`);
    addLine("Gender", personal?.gender);
    addLine("Date of Birth", formatDate(personal?.date_of_birth));
    addLine("Marital Status", personal?.marital_status);
    addLine("Education Level", personal?.education_level);
    addLine("State of Origin", personal?.state_of_origin);
    addLine("BVN", personal?.bvn);
    addLine("Means of Identification", personal?.means_of_identification?.replace('_', ' '));
    addLine("Identification Number", personal?.identification_number);

    // Contact Details
    addSectionHeader("Contact Details");
    const contact = applicant.contact_details;
    addLine("Mobile Number", contact?.mobile_no);
    addLine("Personal Email", contact?.personal_email);
    addLine("Home Address", contact?.home_address);
    addLine("State", contact?.state);
    addLine("Building Type", contact?.building);
    addLine("Accommodation Type", contact?.accommodation_type);
    addLine("Length of Stay", contact?.length_of_stay ? `${contact.length_of_stay} years` : 'N/A');
    addLine("Closest Bus Stop", contact?.closest_bus_stop);
    addLine("Landmark", contact?.landmark);
    addLine("Route Details", contact?.route_details);
    if (contact?.spouse_phone_no) {
        addLine("Spouse Phone Number", contact.spouse_phone_no);
    }
    if (contact?.referee_name) {
        addLine("Referee Name", contact.referee_name);
        addLine("Referee Phone", contact.referee_phone_no);
    }

    // Employment Details
    addSectionHeader("Employment Details");
    const employment = applicant.employment_details;
    addLine("Employer Name", employment?.employer_name);
    addLine("Employment Status", employment?.employment_status);
    addLine("Employment Type", employment?.employment_type);
    addLine("Department", employment?.department);
    addLine("Designation", employment?.designation);
    addLine("Staff ID", employment?.staff_id);
    addLine("Tax ID", employment?.tax_id);
    addLine("Office Email", employment?.office_email);
    addLine("Office Address", employment?.office_address);
    addLine("Office State", employment?.office_state);
    addLine("Office LGA", employment?.office_lga);
    addLine("Time in Current Employment", employment?.time_in_current_employment ? `${employment.time_in_current_employment} years` : 'N/A');
    addLine("Number of Jobs in Last 5 Years", employment?.number_of_jobs_in_last_5_years);
    addLine("Monthly Net Salary", 
        employment?.monthly_net_salary 
            ? formatCurrency(employment.monthly_net_salary)
            : 'Not Provided',
        true
    );

    // Next of Kin
    addSectionHeader("Next of Kin Information");
    const kin = applicant.next_of_kin;
    addLine("Full Name", kin?.full_name);
    addLine("Relationship", kin?.relationship);
    addLine("Phone Number", kin?.phone_number);
    addLine("Email", kin?.email);
    addLine("Residential Address", kin?.residential_address);
    addLine("Employer Name", kin?.employer_name);

    // Footer
    checkPageBreak(15);
    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, y);
    doc.text(`Payskul Application Report - Confidential`, 14, y + 5);

    // Save the PDF
    doc.save(`Applicant_${applicant.id}_Complete_Report.pdf`);
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
                        <div className="text-2xl font-bold text-purple-600">{applicants.length}</div>
                        <div className="text-sm text-gray-600">Currently Displayed</div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Creditworthy Applicants</h2>
                        <button
                            onClick={() => fetchApplicants(API_URL)}
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
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
                                            <td className="px-6 py-4 text-xs">
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

            {showModal && selectedApplicant && (


                <ApplicantDetailsModal
                    selectedApplicant={selectedApplicant}
                    closeModal={closeModal}
                    onDownloadPDF={handleDownloadPDF}
                />

            )}



        </div>
    );
};

export default PaySkulDashboard;
