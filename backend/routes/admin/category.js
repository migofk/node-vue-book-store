var express = require('express');
var router = express.Router();
//calling the middlewares
var auth =  require("../../middlewares/auth/auth");
var admin =  require("../../middlewares/auth/admin");
//calling the functions from the controller
const { create, store, edit, update, destroy, index, show} = require("../../controllers/admin/categoryController");

//create
router.get('/create',auth,admin, create);
router.post('/store',auth,admin, store );
//edit
router.get('/:id/edit',auth,admin, edit );
router.put('/update/:id',auth,admin, update );
//show,index
router.get('/:id',auth,admin,show );
router.get('/',auth,admin,index );
//delete
router.delete('/:id',auth,admin,destroy);

 module.exports = router;