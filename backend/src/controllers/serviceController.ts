import { Request, Response } from 'express';
import { ServiceModel } from '../models/serviceModel';
import { ApiResponse } from '../types/index';

// Get all active services
export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await ServiceModel.getAll();

    const response: ApiResponse<any[]> = {
      success: true,
      data: services
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching services:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch services'
    };
    res.status(500).json(response);
  }
};

// Get service by ID
export const getService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const serviceId = parseInt(id as string);

    if (isNaN(serviceId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid service ID'
      };
      res.status(400).json(response);
      return;
    }

    const service = await ServiceModel.getById(serviceId);

    if (!service) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Service not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<any> = {
      success: true,
      data: service
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching service:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch service'
    };
    res.status(500).json(response);
  }
};

// Get all services (admin only)
export const getAllServicesAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await ServiceModel.getAllAdmin();

    const response: ApiResponse<any[]> = {
      success: true,
      data: services
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching all services:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch all services'
    };
    res.status(500).json(response);
  }
};

// Create new service (admin only)
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceData = req.body;

    const serviceId = await ServiceModel.create(serviceData);

    const response: ApiResponse<{ id: number }> = {
      success: true,
      data: { id: serviceId },
      message: 'Service created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating service:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to create service'
    };
    res.status(500).json(response);
  }
};

// Update service (admin only)
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const serviceId = parseInt(id as string);
    const serviceData = req.body;

    if (isNaN(serviceId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid service ID'
      };
      res.status(400).json(response);
      return;
    }

    const success = await ServiceModel.update(serviceId, serviceData);

    if (!success) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Service not found or update failed'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Service updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating service:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to update service'
    };
    res.status(500).json(response);
  }
};

// Delete service (admin only)
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const serviceId = parseInt(id as string);

    if (isNaN(serviceId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid service ID'
      };
      res.status(400).json(response);
      return;
    }

    const success = await ServiceModel.delete(serviceId);

    if (!success) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Service not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Service deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting service:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to delete service'
    };
    res.status(500).json(response);
  }
};