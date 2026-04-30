const ReportService = require('../services/report.service');

class ReportController {
  static async getTopUsers(req, res, next) {
    try {
      const users = await ReportService.getTopUsers(req.query.limit);
      res.status(200).json({
        success: true,
        message: 'Top users retrieved successfully',
        payload: users,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getItemsSold(req, res, next) {
    try {
      const items = await ReportService.getItemsSold();
      res.status(200).json({
        success: true,
        message: 'Items sold retrieved successfully',
        payload: items,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMonthlySales(req, res, next) {
    try {
      const monthlySales = await ReportService.getMonthlySales(req.query.year);
      res.status(200).json({
        success: true,
        message: 'Monthly sales retrieved successfully',
        payload: monthlySales,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;