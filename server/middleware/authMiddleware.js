// authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
  let token;
  const authHeaders = req.headers.Authorization || req.headers.authorization;
  
  // Check for token in headers, cookies, or request body
  if (authHeaders && authHeaders.startsWith('Bearer')) {
    token = authHeaders.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Not authorized to access this route' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ 
      success: false,
      error: 'Not authorized, token failed' 
    });
  }
};

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        error: 'Not authorized to access this route' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route` 
      });
    }
    
    next();
  };
};