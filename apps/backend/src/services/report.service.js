const Report = require('../models/report.model');
const { AppError } = require('../middleware/errorHandler');

class ReportService {
  static async getTopUsers(limitQuery) {
    const limit = limitQuery ? Number(limitQuery) : 10;
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new AppError('limit must be an integer between 1 and 100', 400);
    }

    return Report.getTopUsers(limit);
  }

  static async getItemsSold() {
    return Report.getItemsSold();
  }

  static async getMonthlySales(yearQuery) {
    const currentYear = new Date().getFullYear();
    const year = yearQuery ? Number(yearQuery) : currentYear;

    if (!Number.isInteger(year) || year < 1900 || year > 3000) {
      throw new AppError('year must be a valid integer', 400);
    }

    return Report.getMonthlySales(year);
  }
}

module.exports = ReportService;
