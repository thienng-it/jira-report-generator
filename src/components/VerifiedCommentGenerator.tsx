import {useState} from 'react';
import type {VerifiedCommentFields} from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Save } from 'lucide-react';
import ActionBar from "./ui/actionBar.tsx";
import FormField from "./ui/formField.tsx";
import {Form} from "react-bootstrap";

const commentFieldConfig = [
    { id: 'summary', label: 'Summary', type: 'text', placeholder: "Brief summary of verification" },
    { id: 'testExecutionLink', label: 'Test Execution Link', type: 'text', placeholder: "Link to test case execution" },
    { id: 'environment', label: 'Environment', type: 'text', placeholder: "e.g. Staging, Prod" },
    { id: 'platform', label: 'Platform/OS', type: 'text', placeholder: "e.g. Chrome/Mac" },
    { id: 'buildVersion', label: 'Build Version', type: 'text', placeholder: "e.g. v1.2.3" },
    { id: 'testAccounts', label: 'Test Accounts', type: 'text', placeholder: "e.g. user@example.com" },
    { id: 'testInfo', label: 'Test Info (Optional)', type: 'text', placeholder: "Additional context" },
    { id: 'testResults', label: 'Test Results', type: 'textarea', placeholder: "What was observed?" },
    { id: 'status', label: 'Status', type: 'select', options: [
            { value: "Pass", label: "Pass" },
            { value: "Fail", label: "Fail" },
            { value: "Blocked", label: "Blocked" },
            { value: "Skipped", label: "Skipped" },
        ] },
    { id: 'evidence', label: 'Objective Evidences', type: 'textarea', placeholder: "Links to screenshots, videos, logs..." },
    { id: 'cc', label: 'CC', type: 'text', placeholder: "@username" },
];

export function VerifiedCommentGenerator() {
    const [fields, setFields] = useState<VerifiedCommentFields>(() => {
        const savedData = localStorage.getItem('jira-verified-comment-presets');
        let presets = {
            environment: '',
            platform: '',
            buildVersion: '',
            testAccounts: '',
        };

        if (savedData) {
            try {
                presets = JSON.parse(savedData);
            } catch (e) {
                console.error("Failed to parse presets", e);
            }
        }

        return {
            summary: '',
            testExecutionLink: '',
            environment: presets.environment,
            platform: presets.platform,
            buildVersion: presets.buildVersion,
            testAccounts: presets.testAccounts,
            testInfo: '',
            testResults: '',
            status: 'Pass',
            evidence: '',
            cc: ''
        };
    });


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

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Verified Comment Generator</CardTitle>
                <CardDescription className="text-base">Generate standardized verification comments for Jira tickets.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Form>
                    {commentFieldConfig.map(field => (
                        <FormField
                            key={field['id']}
                            id={field.id}
                            label={field.label}
                            type={field.type}
                            value={fields[field['id'] as keyof VerifiedCommentFields]}
                            onChange={(v) => setFields({ ...fields, [field.id]: v })}
                            options={field.options}
                        />
                    ))}
                </Form>
                <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={savePresets} title="Save Environment, Platform, Build, Accounts as default">
                        <Save className="mr-2 h-4 w-4" /> Save Presets
                    </Button>
                </div>

                <ActionBar text={generateOutput()} fileName={'verified-comment.txt'} content={generateOutput()} />
            </CardContent>
        </Card>
    );
}
