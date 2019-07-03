const Services = require('../schemas/servicesSchema');

class ServicesModel {
  getServices(req, res) {
    Services.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
}
module.exports = new ServicesModel();
