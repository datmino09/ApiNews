const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'ApiNews',
    description: 'Tài liệu API tự động sinh bởi swagger-autogen',
  },
  host: 'localhost:3001',
  
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./route/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);