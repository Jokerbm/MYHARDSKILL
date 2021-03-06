const express = require('express');
const router = express.Router();
const uuid = require('uuid')
//database
const members = require('../../Members')
//all members
router.get('/', (req, res) => {
    res.json(members)
})
//single members
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else {
        res.status(400).json({ msg: `member id ${req.params.id} is not found` })
    }
})

//create members
router.post('/', (req, res) => {
    // res.send(req.body) check
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: `Please include name and email` })
    }

    members.push(newMember);
    res.redirect('/')
    // res.json(members)
});
// update members
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({msg: 'Member update', member})
            }
        })
    }
    else {
        res.status(400).json({ msg: `member id ${req.params.id} is not found` })
    }
})
//del member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json({ msg: 'member deleated', 
        members: members.filter(member => member.id !== parseInt(req.params.id))})
    }
    else {
        res.status(400).json({ msg: `member id ${req.params.id} is not found` })
    }
})

module.exports = router;