const db = require('../config/database');

class Report {
  static async getTopUsers(limit) {
    const result = await db.query(
      `SELECT
        u.id,
        u.name,
        u.username,
        u.email,
        u.phone,
        u.balance,
        COALESCE(SUM(t.total), 0) AS total_spent,
        RANK() OVER (ORDER BY COALESCE(SUM(t.total), 0) DESC) AS rank
      FROM users u
      LEFT JOIN transactions t
        ON t.user_id = u.id
        AND t.status = 'paid'
      GROUP BY u.id, u.name, u.username, u.email, u.phone, u.balance
      ORDER BY total_spent DESC, u.id ASC
      LIMIT $1`,
      [limit]
    );

    return result.rows;
  }

  static async getItemsSold() {
    const result = await db.query(
      `SELECT
        i.id,
        i.name,
        i.price,
        i.stock,
        COALESCE(SUM(t.quantity), 0) AS total_quantity_sold,
        COALESCE(SUM(t.total), 0) AS total_revenue
      FROM items i
      LEFT JOIN transactions t
        ON t.item_id = i.id
        AND t.status = 'paid'
      GROUP BY i.id, i.name, i.price, i.stock
      ORDER BY total_quantity_sold DESC, i.id ASC`
    );

    return result.rows;
  }

  static async getMonthlySales(year) {
    const result = await db.query(
      `SELECT
        date_trunc('month', t.created_at) AS month,
        COUNT(*)::int AS transaction_count,
        COALESCE(SUM(t.total), 0) AS total_revenue
      FROM transactions t
      WHERE t.status = 'paid'
        AND EXTRACT(YEAR FROM t.created_at) = $1
      GROUP BY date_trunc('month', t.created_at)
      ORDER BY month ASC`,
      [year]
    );

    return result.rows;
  }
}

module.exports = Report;
