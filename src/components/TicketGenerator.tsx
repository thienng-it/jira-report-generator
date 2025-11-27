import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Download } from "lucide-react";
import CopyWithToast from "./ui/copywithtoast";

export function TicketGenerator() {
    const [fields, setFields] = useState({
        summary: "",
        steps: "",
        expectedResult: "",
        actualResult: "",
        environment: "",
        severity: "Medium",
        priority: "P3",
        evidenceLinks: "",
    });

    const [files, setFiles] = useState<File[]>([]);

    // Auto-save
    useEffect(() => {
        const saved = localStorage.getItem("bug-form-v1");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFields(parsed.fields || fields);
                setFiles(parsed.files || []);
            } catch { /* empty */ }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "bug-form-v1",
            JSON.stringify({ fields, files })
        );
    }, [fields, files]);

    const generateBugText = () => {
        return `🐞 *Summary:* ${fields.summary}

📋 *Steps to Reproduce:*
${fields.steps}

🎯 *Expected Result:*
${fields.expectedResult}

⚠️ *Actual Result:*
${fields.actualResult}

🖥️ *Environment:* ${fields.environment}

🔥 *Severity:* ${fields.severity}
🏷️ *Priority:* ${fields.priority}

📎 *Evidence Links:*
${fields.evidenceLinks}
`;
    };
    
    const downloadFile = () => {
        const blob = new Blob([generateBugText()], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bug-report.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>🐞 Bug Report</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* SUMMARY */}
                <div className="space-y-2">
                    <Label htmlFor="summary">🐞 Summary</Label>
                    <Input
                        id="summary"
                        value={fields.summary}
                        onChange={(e) => setFields({ ...fields, summary: e.target.value })}
                        placeholder="Short description of the bug"
                    />
                </div>

                {/* STEPS */}
                <div className="space-y-2">
                    <Label htmlFor="steps">📋 Steps to Reproduce</Label>
                    <Textarea
                        id="steps"
                        className="h-28"
                        value={fields.steps}
                        onChange={(e) => setFields({ ...fields, steps: e.target.value })}
                        placeholder="1. Go to...
2. Click...
3. Observe..."
                    />
                </div>

                {/* EXPECTED */}
                <div className="space-y-2">
                    <Label htmlFor="expected">🎯 Expected Result</Label>
                    <Textarea
                        id="expected"
                        className="h-24"
                        value={fields.expectedResult}
                        onChange={(e) =>
                            setFields({ ...fields, expectedResult: e.target.value })
                        }
                        placeholder="What should happen?"
                    />
                </div>

                {/* ACTUAL */}
                <div className="space-y-2">
                    <Label htmlFor="actual">⚠️ Actual Result</Label>
                    <Textarea
                        id="actual"
                        className="h-24"
                        value={fields.actualResult}
                        onChange={(e) =>
                            setFields({ ...fields, actualResult: e.target.value })
                        }
                        placeholder="What actually happened?"
                    />
                </div>

                {/* ENVIRONMENT */}
                <div className="space-y-2">
                    <Label htmlFor="environment">🖥️ Environment</Label>
                    <Input
                        id="environment"
                        value={fields.environment}
                        onChange={(e) =>
                            setFields({ ...fields, environment: e.target.value })
                        }
                        placeholder="Browser, OS, Build version"
                    />
                </div>

                {/* SEVERITY */}
                <div className="space-y-2">
                    <Label>🔥 Severity</Label>
                    <Select
                        value={fields.severity}
                        onValueChange={(value: string) =>
                            setFields({ ...fields, severity: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Critical">Critical</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* PRIORITY */}
                <div className="space-y-2">
                    <Label>🏷️ Priority</Label>
                    <Select
                        value={fields.priority}
                        onValueChange={(value: string) =>
                            setFields({ ...fields, priority: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="P1">P1</SelectItem>
                            <SelectItem value="P2">P2</SelectItem>
                            <SelectItem value="P3">P3</SelectItem>
                            <SelectItem value="P4">P4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* EVIDENCE LINKS */}
                <div className="space-y-2">
                    <Label htmlFor="evidenceLinks">📎 Evidence Links</Label>
                    <Textarea
                        id="evidenceLinks"
                        className="h-20"
                        value={fields.evidenceLinks}
                        onChange={(e) =>
                            setFields({ ...fields, evidenceLinks: e.target.value })
                        }
                        placeholder="Paste screenshot URLs, logs, video links…"
                    />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 pt-4">
                    <div className="flex-1">
                        <CopyWithToast text={generateBugText()}/>
                    </div>

                    <Button onClick={downloadFile} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}