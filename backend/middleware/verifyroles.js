const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user?.roles) return res.sendStatus(401); // User not authenticated

        const userRoles = Object.keys(req.user.roles); // e.g. ['admin', 'user']
        // Check if any allowedRoles exist in userRoles
        const hasRole = allowedRoles.some(role => userRoles.includes(role));

        if (!hasRole) return res.sendStatus(403); // Forbidden if role not allowed

        next();
    }
}

module.exports = verifyRoles;
