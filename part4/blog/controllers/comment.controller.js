const pool = require("../utils/pgdb");

const getComments = async (request, response) => {
  const { blogId } = request.params;
  const result = await pool.query(
    "SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC",
    [blogId],
  );
  response.json(result.rows);
};

const createComment = async (request, response) => {
  const { blogId } = request.params;
  const { text, author } = request.body;

  if (!text || !author)
    return response.status(400).json({ message: "text or author missing" });

  const result = await pool.query(
    "INSERT INTO comments (blog_id, text, author) VALUES ($1, $2, $3) RETURNING *",
    [blogId, text, author],
  );
  response.status(201).json(result.rows[0]);
};

const deleteComment = async (request, response) => {
  const { commentId } = request.params;

  const result = await pool.query(
    "DELETE FROM comments WHERE id = $1 RETURNING *",
    [commentId],
  );

  if (result.rowCount === 0)
    return response.status(404).json({ message: "comment not found" });

  return response.status(204).end();
};

module.exports = { getComments, createComment, deleteComment };
