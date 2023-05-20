get_name = (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.statusCode = 200;
    res.send('Accounting');
}

module.exports = {
    get_name
};