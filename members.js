// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data for members
let members = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' }
];

// Get all members
app.get('/members', (req, res) => {
    res.json(members);
});

// Get a member by ID
app.get('/members/:id', (req, res) => {
    const memberId = parseInt(req.params.id);
    const member = members.find(m => m.id === memberId);
    if (member) {
        res.json(member);
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

// Add a new member
app.post('/members', (req, res) => {
    const newMember = {
        id: members.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    members.push(newMember);
    res.status(201).json(newMember);
});

// Update a member by ID
app.put('/members/:id', (req, res) => {
    const memberId = parseInt(req.params.id);
    const memberIndex = members.findIndex(m => m.id === memberId);
    if (memberIndex !== -1) {
        members[memberIndex] = {
            id: memberId,
            name: req.body.name,
            email: req.body.email
        };
        res.json(members[memberIndex]);
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

// Delete a member by ID
app.delete('/members/:id', (req, res) => {
    const memberId = parseInt(req.params.id);
    const memberIndex = members.findIndex(m => m.id === memberId);
    if (memberIndex !== -1) {
        const deletedMember = members.splice(memberIndex, 1);
        res.json(deletedMember[0]);
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


