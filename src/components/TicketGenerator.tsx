import { useState } from 'react';
import type { BugFields, StoryFields, TaskFields, EpicFields, TicketType } from '../types';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Download } from 'lucide-react';
import CopyWithToast from '../components/ui/copywithtoast';
import {Col, Form, Row} from "react-bootstrap";

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

    const downloadFile = () => {
        const element = document.createElement("a");
        const file = new Blob([generateOutput()], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${activeTab}-ticket.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
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
                <CardTitle>Ticket Template Generator</CardTitle>
                <CardDescription>Generate standardized Jira tickets.</CardDescription>
                <div className="flex space-x-2 mt-4">
                    {(['bug', 'story', 'task', 'epic'] as TicketType[]).map((type) => (
                        <Button
                            key={type}
                            variant={activeTab === type ? 'default' : 'outline'}
                            onClick={() => setActiveTab(type)}
                        >
                            <span>{typeEmoji[type]}</span>
                            <span className="capitalize">{type}</span>
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {activeTab === 'bug' && (
                    <>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">
                                    Summary
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control id="summary" value={bugFields.summary} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBugFields({ ...bugFields, summary: e.target.value})}></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2"><b>Priority</b></Form.Label>
                                <Col sm="10">
                                    <Form.Select
                                        value={bugFields.priority}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBugFields({ ...bugFields, priority: e.target.value })}
                                    >
                                        <option value="blocker">Blocker</option>
                                        <option value="critical">Critical</option>
                                        <option value="major">Major</option>
                                        <option value="minor">Minor</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">
                                    Steps to Reproduce
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" id="steps" placeholder='1. Go to...
2. Click on...' value={bugFields.stepsToReproduce} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBugFields({ ...bugFields, stepsToReproduce: e.target.value})}></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">
                                    Expected Result
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" id="expected" value={bugFields.expectedResult} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBugFields({ ...bugFields, expectedResult: e.target.value})}></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">
                                    Actual Result
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" id="actual" value={bugFields.actualResult} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBugFields({ ...bugFields, actualResult: e.target.value})}></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">
                                    Environment
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" id="environment" value={bugFields.environment} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBugFields({ ...bugFields, environment: e.target.value})}></Form.Control>
                                </Col>
                            </Form.Group>
                        </Form>
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
                {(['task', 'epic'].includes(activeTab)) && (
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
