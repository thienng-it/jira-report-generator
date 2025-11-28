import React from "react";
import {Form, Row, Col} from "react-bootstrap";

export interface BugFieldProps {
    label: string,
    value?: string,
    id: string,
    onChange: (value: string) => void,
    type?: "text" | "textarea" | "select" | string,
    options?: { label: string; value: string }[],
    placeholder?: string,
}

const FormField: React.FC<BugFieldProps> = ({
                                               label,
                                               value,
                                               id,
                                               onChange,
                                               type = "text",
                                               options,
                                               placeholder,
                                           }) => {
    return (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                {label}
            </Form.Label>

            <Col sm="10">
                {type === "select" ? (
                    <Form.Select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        {options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </Form.Select>
                ) : (
                    <Form.Control
                        as={type === "textarea" ? "textarea" : "input"}
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )}
            </Col>
        </Form.Group>
    );
};

export default FormField;
