import {useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Row, Col, Toast} from 'react-bootstrap';
import {Button} from "./button";
import {Notebook} from "lucide-react";

const CopyWithToast = ({text, className}: { text: string, className?: string }) => {
    const [show, setShow] = useState(false);

    const handleCopy = () => {
        setShow(true);
    };

    return (
        <div>
            <CopyToClipboard text={text}>
                <Button size="icon" variant="outline" onClick={handleCopy} disabled={!text}
                        className={`w-full h-12 ${className}`}>
                    <Notebook className="ml-2 h-4 w-4 m-1"/>
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