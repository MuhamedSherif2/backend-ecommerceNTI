exports.auth = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!userRole) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (roles.includes(userRole)) {
            return next();
        }

        return res.status(403).json({ message: 'Access Denied: insufficient permissions' });
    };
};
