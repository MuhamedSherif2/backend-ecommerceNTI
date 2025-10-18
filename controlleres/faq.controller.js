const faqModel = require('../models/faq.model')

exports.addQuestion = async (req, res) => {
    try {
        const question = await faqModel.create(req.body)
        res.status(201).json({ message: 'FAQ added successfully', data: question })
    } catch (error) {
        res.status(500).json({ message: 'Add FAQ error: ' + error })
    }
}

exports.getAllQuestions = async (req, res) => {
    try {
        const faqs = await faqModel.find()
        res.status(200).json({ data: faqs })
    } catch (error) {
        res.status(500).json({ message: 'Get FAQ error: ' + error })
    }
}
