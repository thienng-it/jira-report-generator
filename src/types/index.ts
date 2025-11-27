export type TicketType = 'bug' | 'story' | 'task' | 'epic';

export interface BugFields {
    summary: string;
    stepsToReproduce: string;
    expectedResult: string;
    actualResult: string;
    environment: string;
    priority: string;
}

export interface StoryFields {
    summary: string;
    role: string;
    feature: string;
    benefit: string;
    acceptanceCriteria: string;
}

export interface TaskFields {
    summary: string;
    description: string;
    scope: string;
}

export interface EpicFields {
    summary: string;
    description: string;
    scope: string;
}

export interface VerifiedCommentFields {
    summary: string;
    testExecutionLink: string;
    environment: string;
    platform: string;
    buildVersion: string;
    testAccounts: string;
    testInfo: string;
    testResults: string;
    status: 'Pass' | 'Fail' | 'Blocked' | 'Skipped';
    evidence: string;
    cc: string;
}
