const fs = require('fs');

module.exports = fs.readdirSync('./public/photos')
  .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'))
  .map(filename => ({
    filename: `/photos/${filename}`
  }))