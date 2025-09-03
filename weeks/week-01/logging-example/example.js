class Record {
  constructor(username, id, payload) {
    this.username = username;
    this.id = id;
    this.payload = payload;
  }

  // ...
}

async function find(username, id) {
  const data = await db.find(id);
  if (!data) {
    return null;
  }

  return new Record(username, id, data);
}

router.get('/:username/:id', async (req, res) => {
  const { id, username } = req.params;
  const record = await find(username, id);

  if (!record) {
    res.status(404).json({ message: `Record not found for id=${id}` });
  } else {
    res.json(record);
  }
});
