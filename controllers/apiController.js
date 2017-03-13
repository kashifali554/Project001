function index(req, res) {
  res.json({
    message: 'Welcome to Kashman store!',
    documentation_url: 'https:/github.com/kashifali554/Project001',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'
      }
    ]
  });
}

module.exports = {
  index: index
}