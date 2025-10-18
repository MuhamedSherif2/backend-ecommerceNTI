const testimonialModel = require('../models/testimonial.model')

exports.addTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialModel.create({
      user: req.user._id,
      message: req.body.message,
      rating: req.body.rating,
    })
    res.status(201).json({
      message: 'Your testimonial has been submitted and is awaiting admin approval.',
      data: testimonial
    })
  } catch (error) {
    res.status(500).json({ message: 'Add testimonial error: ' + error })
  }
}

exports.getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialModel
      .find({ isApproved: true })
      .populate('user', 'name')
      .sort({ createdAt: -1 })
    res.status(200).json({ data: testimonials })
  } catch (error) {
    res.status(500).json({ message: 'Get testimonials error: ' + error })
  }
}

exports.approveTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialModel.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    )
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' })
    res.status(200).json({ message: 'Testimonial approved successfully', data: testimonial })
  } catch (error) {
    res.status(500).json({ message: 'Approve error: ' + error })
  }
}

exports.deleteTestimonial = async (req, res) => {
  try {
    const deleted = await testimonialModel.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Testimonial not found' })
    res.status(200).json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Delete error: ' + error })
  }
}