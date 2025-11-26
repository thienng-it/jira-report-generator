import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Row, Col, Toast } from 'react-bootstrap';
import { Button } from "./button.tsx";

const CopyWithToast = ({ text, className }:{ text: string, className?: string}) => {
    const [show, setShow] = useState(false);

    const handleCopy = () => {
        setShow(true);
    };

    return (
        <div>
            <CopyToClipboard text={text}>
                <Button onClick={handleCopy} disabled={!text} className={className}>
                    Copy to clipboard
                </Button>
            </CopyToClipboard>
            <Row>
                <Col xs={6}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Info</strong>
                        </Toast.Header>
                        <Toast.Body>Woohoo, your text is copied!</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </div>
    );
};

export default CopyWithToast;