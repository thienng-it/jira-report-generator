import { useState } from 'react';
import type { BugFields, StoryFields, TaskFields, EpicFields, TicketType } from '../types';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Copy, Download } from 'lucide-react';

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

    const [storyFields, setStoryFields] = useState<StoryFields>({
        summary: '',
        role: '',
        feature: '',
        benefit: '',
        acceptanceCriteria: ''
    });

    const [taskFields, setTaskFields] = useState<TaskFields>({
        summary: '',
        description: '',
        scope: ''
    });

    const [epicFields, setEpicFields] = useState<EpicFields>({
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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateOutput());
        // Could add toast notification here
    };

    const downloadFile = () => {
        const element = document.createElement("a");
        const file = new Blob([generateOutput()], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${activeTab}-ticket.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Ticket Template Generator</CardTitle>
                <CardDescription>Generate standardized Jira tickets.</CardDescription>
                <div className="flex space-x-2 mt-4">
                    {(['bug', 'story', 'task', 'epic'] as TicketType[]).map((type) => (
                        <Button
                            key={type}
                            variant={activeTab === type ? 'default' : 'outline'}
                            onClick={() => setActiveTab(type)}
                            className="capitalize"
                        >
                            {type}
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {activeTab === 'bug' && (
                    <>
                        <div className="space-y-2">
                            <Label>Summary</Label>
                            <Input
                                value={bugFields.summary}
                                onChange={(e) => setBugFields({ ...bugFields, summary: e.target.value })}
                                placeholder="Brief description of the bug"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Steps to Reproduce</Label>
                            <Textarea
                                value={bugFields.stepsToReproduce}
                                onChange={(e) => setBugFields({ ...bugFields, stepsToReproduce: e.target.value })}
                                placeholder="1. Go to... 2. Click on..."
                                className="h-32"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Expected Result</Label>
                                <Textarea
                                    value={bugFields.expectedResult}
                                    onChange={(e) => setBugFields({ ...bugFields, expectedResult: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Actual Result</Label>
                                <Textarea
                                    value={bugFields.actualResult}
                                    onChange={(e) => setBugFields({ ...bugFields, actualResult: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Environment</Label>
                            <Input
                                value={bugFields.environment}
                                onChange={(e) => setBugFields({ ...bugFields, environment: e.target.value })}
                                placeholder="Browser, OS, Device, etc."
                            />
                        </div>
                    </>
                )}

                {activeTab === 'story' && (
                    <>
                        <div className="space-y-2">
                            <Label>Summary</Label>
                            <Input
                                value={storyFields.summary}
                                onChange={(e) => setStoryFields({ ...storyFields, summary: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>As a...</Label>
                                <Input
                                    value={storyFields.role}
                                    onChange={(e) => setStoryFields({ ...storyFields, role: e.target.value })}
                                    placeholder="user role"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>I want...</Label>
                                <Input
                                    value={storyFields.feature}
                                    onChange={(e) => setStoryFields({ ...storyFields, feature: e.target.value })}
                                    placeholder="feature"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>So that...</Label>
                                <Input
                                    value={storyFields.benefit}
                                    onChange={(e) => setStoryFields({ ...storyFields, benefit: e.target.value })}
                                    placeholder="benefit"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Acceptance Criteria</Label>
                            <Textarea
                                value={storyFields.acceptanceCriteria}
                                onChange={(e) => setStoryFields({ ...storyFields, acceptanceCriteria: e.target.value })}
                                className="h-32"
                            />
                        </div>
                    </>
                )}

                {/* Task and Epic fields are similar, keeping it simple for now */}
                {(activeTab === 'task' || activeTab === 'epic') && (
                    <>
                        <div className="space-y-2">
                            <Label>Summary</Label>
                            <Input
                                value={activeTab === 'task' ? taskFields.summary : epicFields.summary}
                                onChange={(e) => activeTab === 'task' ? setTaskFields({ ...taskFields, summary: e.target.value }) : setEpicFields({ ...epicFields, summary: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={activeTab === 'task' ? taskFields.description : epicFields.description}
                                onChange={(e) => activeTab === 'task' ? setTaskFields({ ...taskFields, description: e.target.value }) : setEpicFields({ ...epicFields, description: e.target.value })}
                                className="h-32"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Scope</Label>
                            <Textarea
                                value={activeTab === 'task' ? taskFields.scope : epicFields.scope}
                                onChange={(e) => activeTab === 'task' ? setTaskFields({ ...taskFields, scope: e.target.value }) : setEpicFields({ ...epicFields, scope: e.target.value })}
                            />
                        </div>
                    </>
                )}

                <div className="flex space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button onClick={copyToClipboard} className="flex-1">
                        <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                    </Button>
                    <Button onClick={downloadFile} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
