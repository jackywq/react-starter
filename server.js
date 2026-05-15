const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const baseData = [
  { date: '04-15', price: 52, yield: 28.5 },
  { date: '04-17', price: 55, yield: 26.2 },
  { date: '04-20', price: 25, yield: 8.3 },
  { date: '04-22', price: 102, yield: 0.5 },
  { date: '04-25', price: 0, yield: 0.2 },
  { date: '04-28', price: 105, yield: 2.1 },
  { date: '05-02', price: 107, yield: 1.8 },
  { date: '05-05', price: 105, yield: 1.5 },
  { date: '05-08', price: 105, yield: 1.2 },
  { date: '05-11', price: 105, yield: 1.0 },
  { date: '05-14', price: 105.05, yield: 2.63 },
];

const generateDataByRange = range => {
  switch (range) {
    case 'realtime':
      return baseData.slice(-3);
    case '1month':
      return baseData.slice(-5);
    case '3months':
      return baseData.slice(-8);
    case '6months':
      return baseData;
    case '1year':
      return [
        ...baseData,
        { date: '03-14', price: 98, yield: 3.2 },
        { date: '02-14', price: 95, yield: 3.5 },
        { date: '01-14', price: 92, yield: 3.8 },
        { date: '12-14', price: 88, yield: 4.1 },
      ];
    case '3years':
      return [
        ...baseData,
        { date: '2025-05', price: 100, yield: 2.8 },
        { date: '2024-05', price: 102, yield: 3.0 },
        { date: '2023-05', price: 98, yield: 3.5 },
      ];
    default:
      return baseData;
  }
};

app.get('/api/chart-data', (req, res) => {
  const { range } = req.query;
  const data = generateDataByRange(range || '6months');

  console.log(`[${new Date().toISOString()}] 请求图表数据 - 范围: ${range}`);
  console.log(`返回数据条数: ${data.length}`);

  res.json({
    success: true,
    data,
    range,
    count: data.length,
  });
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('可用的 API:');
  console.log('  - GET /api/chart-data?range=realtime');
  console.log('  - GET /api/chart-data?range=1month');
  console.log('  - GET /api/chart-data?range=3months');
  console.log('  - GET /api/chart-data?range=6months');
  console.log('  - GET /api/chart-data?range=1year');
  console.log('  - GET /api/chart-data?range=3years');
});
