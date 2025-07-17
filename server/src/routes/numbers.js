// PATCH /api/numbers/:id/sell
router.patch('/:id/sell', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNumber = await prisma.number.update({
      where: { id: parseInt(id) },
      data: {
        status: 'SOLD',
      },
    });
    res.json(updatedNumber);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark as sold' });
  }
});
