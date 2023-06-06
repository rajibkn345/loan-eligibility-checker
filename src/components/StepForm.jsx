// import React, { useState } from "react";
// import Step1 from "./Step1";
// import Step2 from "./Step2";

// const Form = () => {
//   const [step, setStep] = useState(1);
//   const [formValues, setFormValues] = useState({});

//   const nextStep = (values) => {
//     setFormValues({ ...formValues, ...values }); // Combine Step 1 and Step 2 values
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   switch (step) {
//     case 1:
//       return <Step1 nextStep={nextStep} />;
//     case 2:
//       return <Step2 prevStep={prevStep} allvalues={formValues} />;
//     default:
//       return null;
//   }
// };

// export default Form;

import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

const LoanEligibilityChecker = () => {
  const [step, setStep] = useState(1);
  const [loanDetails, setLoanDetails] = useState({});
  const [eligibility, setEligibility] = useState(false);
  const [monthlyRepayable, setMonthlyRepayable] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalRepayable, setTotalRepayable] = useState(0);

  const nextStep = (values) => {
    setLoanDetails(values);
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  function calculateAge(dateString) {
    var today = new Date();

    var birthDate = new Date(dateString);

    var age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if the current month is before the birth month

    var currentMonth = today.getMonth();

    var birthMonth = birthDate.getMonth();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  console.log(calculateAge("2000-11-05"));

  const checkEligibility = (items) => {
    // Perform eligibility check based on loanDetails and set eligibility, monthlyRepayable, totalInterest, and totalRepayable
    // Example calculation (replace with your own logic):
    console.log({ items });
    const { dob, isUK, eStatus, mIncome, mExpenditure, job, term, amount } =
      items;
    console.log({ dob, isUK, eStatus, mIncome, mExpenditure, job });
    const ageVerification = calculateAge(dob) > 18;
    const incomeVerification =
      parseInt(mIncome) * 0.55 > parseInt(mExpenditure);
    const jobVerification = parseInt(job) < 2;
    console.log({ ageVerification, incomeVerification, jobVerification });

    //calulate the loan output
    const monthlyInterestRate = parseInt(term) / 100 / 12;
    const monthlyPayment =
      (parseInt(amount) * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -parseInt(term)));
    const totalInterestAmount =
      monthlyPayment * parseInt(term) - parseInt(amount);
    const totalRepayableAmount = parseInt(amount) + totalInterestAmount;
    // setStep(step + 1);
    setEligibility(true);
    if (
      !ageVerification ||
      !isUK ||
      eStatus === "unemployed" ||
      !incomeVerification ||
      !jobVerification
    ) {
      alert("You are not eligible for the loan");
    } else {
      setStep(step + 1);
    }
    setMonthlyRepayable(monthlyPayment);
    setTotalInterest(totalInterestAmount);
    setTotalRepayable(totalRepayableAmount);
  };

  return (
    <div className="container">
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && (
        <Step2
          prevStep={prevStep}
          allvalues={loanDetails}
          eligibility={checkEligibility}
        />
      )}
      {step === 3 && eligibility && (
        <div>
          <h2>Loan Details</h2>
          <p>Monthly Repayable: {monthlyRepayable}</p>
          <p>Total Interest Amount: {totalInterest}</p>
          <p>Total Repayable: {totalRepayable}</p>
        </div>
      )}
    </div>
  );
};

export default LoanEligibilityChecker;
