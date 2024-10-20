"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_GLOBAL_ISSUE_TYPES = void 0;
exports.DEFAULT_GLOBAL_ISSUE_TYPES = [
    {
        name: 'Bug',
        value: 'bug',
        description: 'A "bug type issue" typically refers to a specific type of technical issue that occurs in software development',
        icon: 'task-issue-types/bug.svg',
        color: '#C24A4A',
        isSystem: true,
        isDefault: false
    },
    {
        name: 'Story',
        value: 'story',
        description: 'A "story (or user story) type issue" typically refers to an issue related to a user story in software development.',
        icon: 'task-issue-types/note.svg',
        color: '#54BA95',
        isSystem: true,
        isDefault: false
    },
    {
        name: 'Task',
        value: 'task',
        description: 'A "task type issue" typically refers to an issue related to a specific task within a project.',
        icon: 'task-issue-types/task-square.svg',
        color: '#5483BA',
        isSystem: true,
        isDefault: false
    },
    {
        name: 'Epic',
        value: 'epic',
        description: 'An "epic type issue" typically refers to an issue related to an Epic in software development.',
        icon: 'task-issue-types/category.svg',
        color: '#8154BA',
        isSystem: true,
        isDefault: true
    }
];
//# sourceMappingURL=default-global-issue-types.js.map