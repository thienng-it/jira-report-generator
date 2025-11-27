import { useState, useEffect } from 'react';
import type { VerifiedCommentFields } from '../types';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Download, Save } from 'lucide-react';
import CopyWithToast from "./ui/copywithtoast.tsx";

export function VerifiedCommentGenerator() {
    const [fields, setFields] = useState<VerifiedCommentFields>({
        summary: '',
        testExecutionLink: '',
        environment: '',
        platform: '',
        buildVersion: '',
        testAccounts: '',
        testInfo: '',
        testResults: '',
        status: 'Pass',
        evidence: '',
        cc: ''
    });

    // Load saved data from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('jira-verified-comment-presets');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setFields(prev => ({
                    ...prev,
                    environment: parsed.environment || '',
                    platform: parsed.platform || '',
                    buildVersion: parsed.buildVersion || '',
                    testAccounts: parsed.testAccounts || '',
                }));
            } catch (error) {
                console.error('Failed to parse saved presets:', error);
            }
        }
    }, []);

    const savePresets = () => {
        const presets = {
            environment: fields.environment,
            platform: fields.platform,
            buildVersion: fields.buildVersion,
            testAccounts: fields.testAccounts,
        };
        localStorage.setItem('jira-verified-comment-presets', JSON.stringify(presets));
        // Could add toast here
    };

    const generateOutput = () => {
        return `*Summary:* ${fields.summary}

*Test Execution Link:*
${fields.testExecutionLink}

*Test Data:*
*   *Environment:* ${fields.environment}
*   *Platform/OS:* ${fields.platform}
*   *Build Version:* ${fields.buildVersion}
*   *Test Accounts:* ${fields.testAccounts}
${fields.testInfo ? `*   *Test Info:* ${fields.testInfo}` : ''}

*Test Results:*
${fields.testResults}

*Status:* {color:${getStatusColor(fields.status)}}${fields.status}{color}

*Objective Evidences:*
${fields.evidence}

*cc:* ${fields.cc}`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pass': return 'green';
            case 'Fail': return 'red';
            case 'Blocked': return 'orange';
            case 'Skipped': return 'gray';
            default: return 'black';
        }
    };

    const downloadFile = () => {
        const element = document.createElement("a");
        const file = new Blob([generateOutput()], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `verified-comment.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Verified Comment Generator</CardTitle>
                <CardDescription>Generate standardized verification comments for Jira tickets.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Summary</Label>
                    <Input
                        value={fields.summary}
                        onChange={(e) => setFields({ ...fields, summary: e.target.value })}
                        placeholder="Brief summary of verification"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Test Execution Link</Label>
                    <Input
                        value={fields.testExecutionLink}
                        onChange={(e) => setFields({ ...fields, testExecutionLink: e.target.value })}
                        placeholder="Link to test case execution"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Environment</Label>
                        <Input
                            value={fields.environment}
                            onChange={(e) => setFields({ ...fields, environment: e.target.value })}
                            placeholder="e.g. Staging, Prod"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Platform/OS</Label>
                        <Input
                            value={fields.platform}
                            onChange={(e) => setFields({ ...fields, platform: e.target.value })}
                            placeholder="e.g. Chrome/Mac"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Build Version</Label>
                        <Input
                            value={fields.buildVersion}
                            onChange={(e) => setFields({ ...fields, buildVersion: e.target.value })}
                            placeholder="e.g. v1.2.3"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Test Accounts</Label>
                        <Input
                            value={fields.testAccounts}
                            onChange={(e) => setFields({ ...fields, testAccounts: e.target.value })}
                            placeholder="e.g. user@example.com"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={savePresets} title="Save Environment, Platform, Build, Accounts as default">
                        <Save className="mr-2 h-4 w-4" /> Save Presets
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label>Test Info (Optional)</Label>
                    <Input
                        value={fields.testInfo}
                        onChange={(e) => setFields({ ...fields, testInfo: e.target.value })}
                        placeholder="Additional context"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Test Results</Label>
                    <Textarea
                        value={fields.testResults}
                        onChange={(e) => setFields({ ...fields, testResults: e.target.value })}
                        placeholder="What was observed?"
                        className="h-24"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Status</Label>
                    <select
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white text-slate-900 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                        value={fields.status}
                        onChange={(e) => setFields({ ...fields, status: e.target.value as 'Pass' | 'Fail' | 'Blocked' | 'Skipped' })}
                    >
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Skipped">Skipped</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label>Objective Evidences</Label>
                    <Textarea
                        value={fields.evidence}
                        onChange={(e) => setFields({ ...fields, evidence: e.target.value })}
                        placeholder="Links to screenshots, videos, logs..."
                        className="h-24"
                    />
                </div>

                <div className="space-y-2">
                    <Label>CC</Label>
                    <Input
                        value={fields.cc}
                        onChange={(e) => setFields({ ...fields, cc: e.target.value })}
                        placeholder="@username"
                    />
                </div>

                <div className="flex space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex-1">
                        <CopyWithToast text={generateOutput()}/>
                    </div>
                    <Button onClick={downloadFile} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
