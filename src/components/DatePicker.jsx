import React from "react";
import { Form } from "react-bootstrap";

function DatePicker({ value, setDate }) {
  return (
    <div className="col-md-6 mb-4 d-flex align-items-center">
      <div className="form-outline datepicker w-100">
        <Form.Group controlId="dob">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            value={value}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="dob"
            placeholder="Date of Birth"
          />
        </Form.Group>
      </div>
    </div>
  );
}

export default DatePicker;
