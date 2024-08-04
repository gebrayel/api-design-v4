import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middlewares';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';

const router = Router();

//PRODUCTS
router.get('/product', getProducts);

router.get('/product/:id', getOneProduct);

router.post(
  '/product',
  body('name')
    .isString()
    .withMessage('El nombre del producto es obligatorio')
    .notEmpty()
    .withMessage('El nombre del producto no puede estar vacío'),
  handleInputErrors,
  createProduct
);

router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
);

router.delete('/product/:id', deleteProduct);

//UPDATES
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);

router.post(
  '/update',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'DEPRECATED', 'SHIPPED']).optional(),
  body('version').optional(),
  handleInputErrors,
  createUpdate
);

router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'DEPRECATED', 'SHIPPED']).optional(),
  body('version').optional(),
  handleInputErrors,
  updateUpdate
);
router.delete('/update/:id', deleteUpdate);

router.get('/updatepoint', (req, res) => {});
router.get('/updatepoint/:id', (req, res) => {});
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req, res) => {}
);
router.get(
  '/postpoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').optional().isString(),
  (req, res) => {}
);
router.delete('/updatepoint/:id', (req, res) => {});

router.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401);
    res.json({ message: 'unauthorized' });
  } else if (err.type === 'input') {
    res.status(400);
    res.json({ message: 'invalid input' });
  } else {
    res.status(500);
    res.json({ message: 'Something went wrong...' });
  }
});

export default router;
