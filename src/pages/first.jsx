import React, { useState } from 'react';
import { X, User, Briefcase, DollarSign, Calendar, FileText, AlertCircle } from 'lucide-react';
import Header from '../components/Header';

const PaySkulDashboard = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Raw data from the API
  const applicantsData = {
    count: 4,
    results: [
      {
        id: 52,
        sid: '76dc7e92-2fc4-4246-aa9d-5257b7ed9f91',
        amount_needed: '35000.00',
        tenor_in_months: 6,
        purpose: 'School Fees',
        status: 'pending_credit_check',
        created_at: '2025-08-27T10:43:46.587673Z',
        credit_report_data: null,
        employment_details: {
          employer_name: 'PayskulApp',
          department: 'Customer Service',
          employment_status: 'Employed',
          employment_type: 'Full Time',
          office_state: 'Lagos',
          office_address: 'Lekki',
          designation: 'Customer Service Representative',
          time_in_current_employment: '8',
          number_of_jobs_in_last_5_years: 3,
          office_email: ''
        }
      },
      {
        id: 47,
        sid: '6ac51946-c2de-44f4-acd4-2d2cddfb847a',
        amount_needed: '10000.00',
        tenor_in_months: 9,
        purpose: 'School Fees',
        status: 'offer_made',
        created_at: '2025-08-26T10:20:18.422312Z',
        credit_report_data: {
          debt: {
            total_debt: 110000000,
            credit_check: true,
            debt_by_institution: [
              { amount_owed: 35000000, institution: 'ABC Bank Plc' },
              { amount_owed: 75000000, institution: 'XYZ COMPANY LIMITED' }
            ]
          },
          summary: {
            can_afford: false,
            monthly_payment: 3384762
          },
          months_assessed: {
            start: '2022-08-19',
            end: '2023-06-15'
          }
        },
        employment_details: {
          employer_name: 'Payskul',
          department: 'Tech',
          employment_status: 'Employed',
          employment_type: 'Full Time',
          office_state: 'Delta',
          office_address: 'Jakpa',
          office_lga: 'Udu',
          designation: 'Mobile',
          time_in_current_employment: '2',
          number_of_jobs_in_last_5_years: 6,
          office_email: 'ese@gmail.com'
        },
        next_of_kin: null,
      },
      {
        id: 46,
        sid: 'c279e16d-51f0-403d-9fb0-174bcca0a4ca',
        amount_needed: '40000.00',
        tenor_in_months: 6,
        purpose: 'School Fees',
        status: 'needs_review',
        created_at: '2025-08-25T21:07:08.209299Z',
        credit_report_data: {
          debt: {
            total_debt: 110000000,
            credit_check: true,
            debt_by_institution: [
              { amount_owed: 35000000, institution: 'ABC Bank Plc' },
              { amount_owed: 75000000, institution: 'XYZ COMPANY LIMITED' }
            ]
          },
          summary: {
            can_afford: false,
            monthly_payment: 3384762
          },
          months_assessed: {
            start: '2022-08-19',
            end: '2023-06-15'
          }
        },
        employment_details: {
          employer_name: 'Adegoke',
          department: 'Tech',
          employment_status: 'Employed',
          employment_type: 'Full Time',
          staff_id: '001',
          tax_id: '009',
          office_state: 'remote',
          office_address: 'Satellite',
          office_lga: 'amuwo',
          designation: 'CTO',
          time_in_current_employment: '2022',
          number_of_jobs_in_last_5_years: 3,
          office_email: 'michael@payskul.com'
        },
        next_of_kin: null,

      },
      {
        id: 41,
        sid: '21716cdc-7077-49cc-9ad3-7852071fb6e0',
        amount_needed: '410000.00',
        tenor_in_months: 6,
        purpose: 'School Fees',
        status: 'offer_made',
        created_at: '2025-08-21T15:29:17.069507Z',
        credit_report_data: {
          debt: {
            total_debt: 110000000,
            credit_check: true,
            debt_by_institution: [
              { amount_owed: 35000000, institution: 'ABC Bank Plc' },
              { amount_owed: 75000000, institution: 'XYZ COMPANY LIMITED' }
            ]
          },
          summary: {
            can_afford: false,
            monthly_payment: 3384762
          },
          months_assessed: {
            start: '2022-08-19',
            end: '2023-06-15'
          }
        },
        employment_details: {
          employer_name: 'Teerifix',
          department: 'management',
          employment_status: 'Self Employed',
          employment_type: 'Full Time',
          office_state: 'Lagos',
          office_address: 'doraflash10@yahoo.com',
          office_lga: 'Amuwo',
          designation: 'director',
          time_in_current_employment: '7 years',
          number_of_jobs_in_last_5_years: 1,
          office_email: ''
        },
        next_of_kin: null,
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending_credit_check': 'bg-yellow-100 text-yellow-800',
      'offer_made': 'bg-green-100 text-green-800',
      'needs_review': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').toUpperCase();
  };

  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-2">
        <Header />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payskul Dashboard</h1>
          <p className="text-gray-600">Manage loan applications and creditworthy applicants</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Total Loans</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{applicantsData.count}</div>
            <div className="text-sm text-gray-600">Creditworthy Applicants</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Creditworthy Applicants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicantsData.results.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{applicant.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {applicant.employment_details?.employer_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {applicant.employment_details?.office_email || 'No email'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(applicant.amount_needed)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(applicant.status)}`}>
                        {formatStatus(applicant.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {applicant.employment_details?.employment_status || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(applicant.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(applicant)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* {showModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Applicant Details #{selectedApplicant.id}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="border-b pb-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Loan Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Amount Needed</p>
                    <p className="text-base font-medium text-gray-900">{formatCurrency(selectedApplicant.amount_needed)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tenor</p>
                    <p className="text-base font-medium text-gray-900">{selectedApplicant.tenor_in_months} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Purpose</p>
                    <p className="text-base font-medium text-gray-900">{selectedApplicant.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedApplicant.status)}`}>
                      {formatStatus(selectedApplicant.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Application ID</p>
                    <p className="text-base font-medium text-gray-900 truncate">{selectedApplicant.sid}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created At</p>
                    <p className="text-base font-medium text-gray-900">{formatDate(selectedApplicant.created_at)}</p>
                  </div>
                </div>
              </div>

              {selectedApplicant.employment_details && (
                <div className="border-b pb-6">
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Employment Details</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Employer Name</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.employer_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Designation</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.designation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Employment Status</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.employment_status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Employment Type</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.employment_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time in Current Employment</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.time_in_current_employment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Office State</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.office_state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Office Address</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.office_address}</p>
                    </div>
                    {selectedApplicant.employment_details.office_email && (
                      <div>
                        <p className="text-sm text-gray-600">Office Email</p>
                        <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.office_email}</p>
                      </div>
                    )}
                    {selectedApplicant.employment_details.office_lga && (
                      <div>
                        <p className="text-sm text-gray-600">Office LGA</p>
                        <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.office_lga}</p>
                      </div>
                    )}
                    {selectedApplicant.employment_details.staff_id && (
                      <div>
                        <p className="text-sm text-gray-600">Staff ID</p>
                        <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.staff_id}</p>
                      </div>
                    )}
                    {selectedApplicant.employment_details.tax_id && (
                      <div>
                        <p className="text-sm text-gray-600">Tax ID</p>
                        <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.tax_id}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600">Jobs in Last 5 Years</p>
                      <p className="text-base font-medium text-gray-900">{selectedApplicant.employment_details.number_of_jobs_in_last_5_years}</p>
                    </div>
                  </div>
                </div>
              )} */}

              {/* {selectedApplicant.credit_report_data && (
                <div className="border-b pb-6">
                  <div className="flex items-center mb-4">
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Credit Report</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <p className="font-semibold text-red-900">Affordability Assessment</p>
                      </div>
                      <p className="text-sm text-red-700">
                        Can Afford: {selectedApplicant.credit_report_data.summary.can_afford ? 'Yes' : 'No'}
                      </p>
                      <p className="text-sm text-red-700">
                        Monthly Payment: {formatCurrency(selectedApplicant.credit_report_data.summary.monthly_payment)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Total Debt</p>
                      <p className="text-base font-medium text-gray-900 mb-3">
                        {formatCurrency(selectedApplicant.credit_report_data.debt.total_debt)}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-2">Debt by Institution</p>
                      <div className="space-y-2">
                        {selectedApplicant.credit_report_data.debt.debt_by_institution.map((debt, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded">
                            <p className="text-sm font-medium text-gray-900">{debt.institution}</p>
                            <p className="text-sm text-gray-600">{formatCurrency(debt.amount_owed)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Assessment Start</p>
                        <p className="text-base font-medium text-gray-900">
                          {formatDate(selectedApplicant.credit_report_data.months_assessed.start)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Assessment End</p>
                        <p className="text-base font-medium text-gray-900">
                          {formatDate(selectedApplicant.credit_report_data.months_assessed.end)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}

              {/* {!selectedApplicant.credit_report_data && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">Credit report pending or not available</p>
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
      {showModal && selectedApplicant && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
      {/* Modal Header */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Applicant Details #{selectedApplicant.id}
        </h2>
        <button onClick={closeModal} className="text-white hover:text-gray-200 transition">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6 space-y-8">

        {/* Loan Information */}
        <section className="border-b pb-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Loan Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-600">Amount Needed</p><p className="font-medium">{formatCurrency(selectedApplicant.amount_needed)}</p></div>
            <div><p className="text-sm text-gray-600">Tenor</p><p className="font-medium">{selectedApplicant.tenor_in_months} months</p></div>
            <div><p className="text-sm text-gray-600">Purpose</p><p className="font-medium">{selectedApplicant.purpose}</p></div>
            <div><p className="text-sm text-gray-600">Status</p><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedApplicant.status)}`}>{formatStatus(selectedApplicant.status)}</span></div>
            <div><p className="text-sm text-gray-600">Application ID</p><p className="font-medium truncate">{selectedApplicant.sid}</p></div>
            <div><p className="text-sm text-gray-600">Created At</p><p className="font-medium">{formatDate(selectedApplicant.created_at)}</p></div>
          </div>
        </section>

        {/* Employment Details */}
        {selectedApplicant.employment_details && (
          <section className="border-b pb-6">
            <div className="flex items-center mb-4">
              <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Employment Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedApplicant.employment_details).map(([key, value]) => (
                value && typeof value === 'string' && !['id', 'created_at', 'updated_at', 'user', 'employment_letter'].includes(key) && (
                  <div key={key}>
                    <p className="text-sm text-gray-600 capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="font-medium text-gray-900">{value}</p>
                  </div>
                )
              ))}
              {selectedApplicant.employment_details.employment_letter && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Employment Letter</p>
                  <a
                    href={selectedApplicant.employment_details.employment_letter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Document
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Next of Kin */}
        {selectedApplicant.next_of_kin && (
          <section className="border-b pb-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Next of Kin</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedApplicant.next_of_kin).map(([key, value]) => (
                value && (
                  <div key={key}>
                    <p className="text-sm text-gray-600 capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Personal Info */}
        {selectedApplicant.personal_info && (
          <section className="border-b pb-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedApplicant.personal_info).map(([key, value]) => (
                value && (
                  <div key={key}>
                    <p className="text-sm text-gray-600 capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Contact Details */}
        {selectedApplicant.contact_details && (
          <section className="border-b pb-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Contact Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedApplicant.contact_details).map(([key, value]) => (
                value && (
                  <div key={key}>
                    <p className="text-sm text-gray-600 capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Credit Report */}
        {selectedApplicant.credit_report_data ? (
          <section className="border-b pb-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Credit Report</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <p className="font-semibold text-red-900">Affordability Assessment</p>
                </div>
                <p>Can Afford: {selectedApplicant.credit_report_data.summary.can_afford ? 'Yes' : 'No'}</p>
                <p>Monthly Payment: {formatCurrency(selectedApplicant.credit_report_data.summary.monthly_payment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Debt by Institution</p>
                <div className="space-y-2">
                  {selectedApplicant.credit_report_data.debt.debt_by_institution.map((d, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{d.institution}</p>
                      <p className="text-sm">{formatCurrency(d.amount_owed)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">Credit report pending or not available</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
        <button onClick={closeModal} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default PaySkulDashboard;