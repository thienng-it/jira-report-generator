import { useState } from "react";
import { Row, Col, Toast } from "react-bootstrap";
import { Button } from "./button";
import {downloadTextFile} from "../../lib/utils.ts";

interface DownloadWithToastProps {
    filename: string;
    content: string;
    className?: string;
}

const DownloadWithToast = ({ filename, content, className }: DownloadWithToastProps) => {
    const [show, setShow] = useState(false);

    const handleDownload = () => {
        // Create the file
        downloadTextFile(content, filename)
        // Show toast
        setShow(true);
    };

    return (
        <div>
            <Button
                onClick={handleDownload}
                disabled={!content}
                className={`w-full h-12 ${className}`}
                variant="outline"
            >
                Download
            </Button>

            <Row>
                <Col xs={6}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Downloaded</strong>
                        </Toast.Header>
                        <Toast.Body>File <b>{filename}</b> has been downloaded successfully.</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </div>
    );
};

export default DownloadWithToast;
