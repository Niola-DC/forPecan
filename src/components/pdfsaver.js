
const handleDownloadPDF = (selectedApplicant) => {
    if (!selectedApplicant) return;

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
    addLine("Application ID", `#${selectedApplicant.id}`, true);
    addLine("Date Created", formatDate(selectedApplicant.created_at));
    addLine("Status", selectedApplicant.status?.replace('_', ' ').toUpperCase());
    
    // Loan Request Details
    addSectionHeader("Loan Request Details");
    addLine("Loan Amount", formatCurrency(selectedApplicant.amount_needed));
    addLine("Purpose", selectedApplicant.purpose);
    addLine("Tenor", `${selectedApplicant.tenor_in_months} months`);

    // Credit Bureau Report
    if (selectedApplicant.credit_bureau_report) {
        const credit = selectedApplicant.credit_bureau_report;
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
    const loanTerms = selectedApplicant.loan_terms;
    addLine("Loan Amount", formatCurrency(loanTerms?.loan_amount));
    addLine("Tenor", `${selectedApplicant.tenor_in_months} months`);
    addLine("Interest Rate (Monthly)", 
        selectedApplicant.interest_rate || loanTerms?.interest_rate_monthly 
            ? `${selectedApplicant.interest_rate || loanTerms.interest_rate_monthly}%` 
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
    const personal = selectedApplicant.personal_info;
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
    const contact = selectedApplicant.contact_details;
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
    const employment = selectedApplicant.employment_details;
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
    const kin = selectedApplicant.next_of_kin;
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
    doc.save(`Applicant_${selectedApplicant.id}_Complete_Report.pdf`);
};