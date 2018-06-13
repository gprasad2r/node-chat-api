const express = require('express');
const path =require('path');
const app =express();
const port = process.env.PORT || 3000;
var publicpath = path.join(__dirname, '../public');
app.use(express.static(publicpath));


app.listen(port, () => {
	console.log(`server is up on port ${port}`);
});