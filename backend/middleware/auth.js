import { verifyToken } from '../utils/auth';

/**
 * Authentication middleware for API routes
 * Verifies JWT token from cookies and attaches user to request
 */
export function authMiddleware(handler) {
    return async (req, res) => {
        // Check for token in cookies first, then in Authorization header
        let token = req.cookies.token;

        if (!token && req.headers.authorization) {
            // Extract token from "Bearer <token>" format
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        // Attach user info to request
        req.user = decoded;

        return handler(req, res);
    };
}

/**
 * Admin-only middleware
 * Must be used after authMiddleware
 */
export function adminMiddleware(handler) {
    return authMiddleware(async (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        return handler(req, res);
    });
}
