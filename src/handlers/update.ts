import prisma from '../db';

//get all products of user
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  res.json({
    data: products.map((product) => product.updates.map((update) => update)),
  });
};

export const getOneUpdate = async (req, res) => {
  const id = req.params.id;
  const update = await prisma.update.findUnique({
    where: {
      id: id,
    },
  });
  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: req.body.productId,
        belongsToId: req.user.id,
      },
    },
  });

  if (!product) {
    return res.json({ error: 'Product not found' });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      productId: req.body.productId,
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products
    .map((product) => product.updates.map((update) => update))
    .flat();

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ error: 'Update not found' });
  }

  const updateUpdated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updateUpdated });
};

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
          belongsToId: req.user.id,
        },
        include: {
          updates: true,
        },
      });
    
      const updates = products
        .map((product) => product.updates.map((update) => update))
        .flat();
    
      const match = updates.find((update) => update.id === req.params.id);
    
      if (!match) {
        return res.json({ error: 'Update not found' });
      }
    
      const updateDeleted = await prisma.update.delete({
        where: {
          id: req.params.id,
        },
      });
      res.json({ data: updateDeleted });
};
