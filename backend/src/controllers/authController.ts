import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { LoginRequest, AuthTokens, ApiResponse, User } from '../types/index';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: LoginRequest = req.body;

    // Validate input
    if (!username || !password) {
      res.status(400).json({
        success: false,
        error: 'Username and password are required'
      } as ApiResponse<null>);
      return;
    }

    // Find user in database
    const [rows] = await pool.execute(
      'SELECT id, username, email, password_hash, full_name, is_active FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    const users = rows as any[];
    if (users.length === 0) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      } as ApiResponse<null>);
      return;
    }

    const user = users[0];

    // Check if user is active
    if (!user.is_active) {
      res.status(401).json({
        success: false,
        error: 'Account is disabled'
      } as ApiResponse<null>);
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      } as ApiResponse<null>);
      return;
    }

    // Generate tokens
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE || '24h'
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
    } as jwt.SignOptions);

    // Store refresh token in database (optional - for token blacklisting)
    // For now, we'll just send it to the client

    const tokens: AuthTokens = {
      accessToken,
      refreshToken
    };

    // Return user info and tokens
    const userInfo: Partial<User> = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name
    };

    res.json({
      success: true,
      data: {
        user: userInfo,
        tokens
      },
      message: 'Login successful'
    } as ApiResponse<{ user: Partial<User>; tokens: AuthTokens }>);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      } as ApiResponse<null>);
      return;
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;

    // Generate new access token
    const payload = {
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE || '24h'
    } as jwt.SignOptions);

    const tokens: AuthTokens = {
      accessToken,
      refreshToken // Send back the same refresh token
    };

    res.json({
      success: true,
      data: tokens,
      message: 'Token refreshed successfully'
    } as ApiResponse<AuthTokens>);
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(403).json({
      success: false,
      error: 'Invalid refresh token'
    } as ApiResponse<null>);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // In a more complex implementation, you might blacklist the token
    // For now, just return success
    res.json({
      success: true,
      message: 'Logged out successfully'
    } as ApiResponse<null>);
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      } as ApiResponse<null>);
      return;
    }

    // Get full user profile
    const [rows] = await pool.execute(
      'SELECT id, username, email, full_name, bio, avatar_url, linkedin_url, github_url, website_url, is_active, created_at, updated_at FROM users WHERE id = ?',
      [req.user.userId]
    );

    const users = rows as any[];
    if (users.length === 0) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      } as ApiResponse<null>);
      return;
    }

    const user = users[0];

    res.json({
      success: true,
      data: user
    } as ApiResponse<User>);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};