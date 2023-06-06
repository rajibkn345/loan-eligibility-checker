import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";

const Step1 = ({ nextStep }) => {
  const formik = useFormik({
    initialValues: {
      amount: 0,
      term: "",
    },
    onSubmit: (values) => {
      console.log({ values });
      nextStep(values); // Pass the form values to the next step
    },
  });

  return (
    <div className="container">
      <h2>Loan Calculator</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formAmount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            defaultValue={0}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTerm">
          <Form.Label>Term:(Months)</Form.Label>
          <Form.Control
            as="select"
            name="term"
            value={formik.values.term}
            onChange={formik.handleChange}
          >
            <option value="">Select terms</option>

            <option value="12">12 months</option>

            <option value="24">24 months</option>

            <option value="36">36 months</option>

            <option value="48">48 months</option>

            <option value="60">60 months</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Next
        </Button>
      </Form>
    </div>
  );
};

export default Step1;
