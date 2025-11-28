import { useState } from 'react';
import type { BugFields, StoryFields, TaskFields, EpicFields, TicketType } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, } from './ui/card';
import {Form} from "react-bootstrap";
import FormField from "./ui/formField.tsx";
import ActionBar from "./ui/actionBar.tsx";

const bugFieldConfig = [
    {
        id: "summary",
        label: "Summary",
        type: "text",
    },
    {
        id: "priority",
        label: "Priority",
        type: "select",
        options: [
            { value: "blocker", label: "Blocker" },
            { value: "critical", label: "Critical" },
            { value: "major", label: "Major" },
            { value: "minor", label: "Minor" },
        ],
    },
    {
        id: "stepsToReproduce",
        label: "Steps to Reproduce",
        type: "textarea",
        placeholder: `1. Go to...\n2. Click on...`,
    },
    {
        id: "expectedResult",
        label: "Expected Result",
        type: "textarea",
    },
    {
        id: "actualResult",
        label: "Actual Result",
        type: "textarea",
    },
    {
        id: "environment",
        label: "Environment",
        type: "textarea",
    },
];

const storyFieldConfig = [
    {
        id: "summary",
        label: "Summary",
        type: "text",
    },
    {
        id: "role",
        label: "As a...",
        type: "text",
        placeholder: "User role",
    },
    {
        id: "feature",
        label: "I want...",
        type: "text",
        placeholder: "feature",
    },
    {
        id: "benefit",
        label: "So that...",
        type: "text",
        placeholder: "brings what benefits",
    },
    {
        id: "acceptanceCriteria",
        label: "Acceptance Criteria",
        type: "textarea",
    },
];

// Task and Epic share the same fields for simplicity
const taskFieldConfig = [
    {
        id: "summary",
        label: "Summary",
        type: "text",
    },
    {
        id: "description",
        label: "Description",
        type: "textarea",
    },
    {
        id: "scope",
        label: "Scope",
        type: "textarea",
    },
];

export function TicketGenerator() {
    const [activeTab, setActiveTab] = useState<TicketType>('bug');

    // State for each ticket type
    const [bugFields, setBugFields] = useState<BugFields>({
        summary: '',
        stepsToReproduce: '',
        expectedResult: '',
        actualResult: '',
        environment: '',
        priority: 'Medium'
    });

    const [storyFields] = useState<StoryFields>({
        summary: '',
        role: '',
        feature: '',
        benefit: '',
        acceptanceCriteria: ''
    });

    const [taskFields] = useState<TaskFields>({
        summary: '',
        description: '',
        scope: ''
    });

    const [epicFields] = useState<EpicFields>({
        summary: '',
        description: '',
        scope: ''
    });

    const generateOutput = () => {
        switch (activeTab) {
            case 'bug':
                return `*Summary:* ${bugFields.summary}

*Steps to Reproduce:*
${bugFields.stepsToReproduce}

*Expected Result:*
${bugFields.expectedResult}

*Actual Result:*
${bugFields.actualResult}

*Environment:*
${bugFields.environment}

*Priority:* ${bugFields.priority}`;

            case 'story':
                return `*Summary:* ${storyFields.summary}

*User Story:*
As a ${storyFields.role}, I want ${storyFields.feature}, so that ${storyFields.benefit}.

*Acceptance Criteria:*
${storyFields.acceptanceCriteria}`;

            case 'task':
                return `*Summary:* ${taskFields.summary}

*Description:*
${taskFields.description}

*Scope:*
${taskFields.scope}`;

            case 'epic':
                return `*Summary:* ${epicFields.summary}

*Description:*
${epicFields.description}

*Scope:*
${epicFields.scope}`;
        }
    };

    const typeEmoji: Record<TicketType, string> = {
        bug: '🐞',
        story: '📘',
        task: '🧩',
        epic: '🌋',
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-wrap gap-3 mt-6">
                    {(['bug', 'story', 'task', 'epic'] as TicketType[]).map((type) => (
                        <Button
                            key={type}
                            variant={activeTab === type ? 'default' : 'outline'}
                            onClick={() => setActiveTab(type)}
                            className="gap-2 px-6 h-11"
                        >
                            <span className="text-base">{typeEmoji[type]}</span>
                            <span className="capitalize">{type}</span>
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {activeTab === 'bug' && (
                    <>
                        <Form>
                            {bugFieldConfig.map(field => (
                                <FormField
                                    key={field['id']}
                                    id={field.id}
                                    label={field.label}
                                    type={field.type}
                                    value={bugFields[field['id'] as keyof BugFields]}
                                    onChange={(v) => setBugFields({ ...bugFields, [field.id]: v })}
                                    options={field.options}
                                    placeholder={field.placeholder}
                                />
                            ))}
                        </Form>
                    </>
                )}

                {activeTab === 'story' && (
                    <>
                        <Form>
                            {storyFieldConfig.map(field => (
                                <FormField
                                    key={field['id']}
                                    id={field.id}
                                    label={field.label}
                                    type={field.type}
                                    value={bugFields[field['id'] as keyof BugFields]}
                                    onChange={(v) => setBugFields({ ...bugFields, [field.id]: v })}
                                    placeholder={field.placeholder}
                                />
                            ))}
                        </Form>
                    </>
                )}

                {/* Task and Epic fields are similar, keeping it simple for now */}
                {(['task', 'epic'].includes(activeTab)) && (
                    <>
                        <Form>
                            {taskFieldConfig.map(field => (
                                <FormField
                                    key={field['id']}
                                    id={field.id}
                                    label={field.label}
                                    type={field.type}
                                    value={bugFields[field['id'] as keyof BugFields]}
                                    onChange={(v) => setBugFields({ ...bugFields, [field.id]: v })}
                                />
                            ))}
                        </Form>
                    </>
                )}

                <ActionBar text={generateOutput()} content={generateOutput()} fileName={`${activeTab}-ticket.txt`} />
            </CardContent>
        </Card>
    );
}