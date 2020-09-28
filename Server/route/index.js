const alip = require('./alipay_route')
const upload = require('./upload')
const lreg = require('./lreg')
const infop = require('./infop')
const pub = require('./Publicaccess')
const tvi = require('./tview')
const brain = require('./braintree_route')
module.exports = app =>{
	app.engine('art', require('express-art-template'));
	app.use(pub)
	app.use(lreg)
	app.use(infop)
	app.use(tvi)
	app.use(alip)
	app.use(brain)
	app.use(upload)  
}
