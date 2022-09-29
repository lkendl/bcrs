/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 28 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

/**
 * CreateInvoice
 */
router.post('/:userName', async(req, res) => {
  try
  {
    const newInvoice = {
      userName: req.params.userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total
    }

    console.log(newInvoice);

    Invoice.create(newInvoice, function(err, invoice)
    {
      if (err)
      {
        console.log(err);
        const createInvoiceMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(err);
        const createInvoiceResponse = new BaseResponse(200, 'Query successful', invoice);
        res.json(createInvoiceResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});

/**
 * FindPurchasesByService
 */
/**
 * findPurchasesByService
 * @openapi
 * /api/purchases-graph:
 *  get:
 *    tags:
 *      - Invoices
 *    description: API for finding purchases by service from MongoDB.
 *    summary: Returns purchases by service document
 *    responses:
 *      "200":
 *        description: Query successful
 *      "500":
 *        description: Internal server error
 *      "501":
 *        description: MongoDB Exception
 */
 router.get('/purchases-graph', async(req, res) => {
  try
  {
    Invoice.aggregate([
      {
        $unwind: '$lineItems'
      },
      {
        $group:
        {
          '_id':
          {
            'title': '$lineItems.title',
            'price': '$lineItems.price'
          },
          'count':
          {
            $sum: 1
          }
        }
      },
      {
        $sort:
        {
          '_id.title': 1
        }
      }
    ], function(err, purchaseGraph)
    {
      if (err)
      {
        console.log(err);
        const findPurchasesByServiceGraphMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(err);
        const findPurchasesByServiceGraphResponse = new BaseResponse(200, 'Query successful', invoice);
        res.json(findPurchasesByServiceGraphResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findPurchasesByServiceGraphCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findPurchasesByServiceGraphCatchErrorResponse.toObject());
  }
});

module.exports = router;
