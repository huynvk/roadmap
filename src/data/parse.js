const csv = require('csvtojson');
const { pipe } = require('ramda');
const fs = require('fs');

const fieldsMapping = {
  field1: 'category',
  field2: 'item',
  field3: 'subItem',
  FE: 'feJunior',
  field5: 'feMid',
  field6: 'feSenior',
  'Full Stack': 'fsJunior',
  field8: 'fsMid',
  field9: 'fsSenior',
  BE: 'beJunior',
  field11: 'beMid',
  field12: 'beSenior',
  DevOps: 'doJunior',
  field14: 'doMid',
  field15: 'doSenior',
  QC: 'qcJunior',
  field17: 'qcMid',
  field18: 'qcSenior',
};

const parseFile = async () => {
  const data = await csv().fromFile('./data.csv');
  return data;
};

const remove1stRow = (data) => {
  data.shift();
  return data;
};

const updateFieldHeaders = (data) => {
  return data.map((item) => {
    const obj = {};
    for (const [key, newKey] of Object.entries(fieldsMapping)) {
      obj[newKey] = item[key];
    }
    return obj;
  });
};

const updateSkillInfo = (data) => {
  let latestItem = '';
  let latestCategory = '';
  return data.map(({ category, item, subItem, ...rest }, index) => {
    latestItem = subItem ? item || latestItem : item;
    latestCategory = latestItem ? category || latestCategory : category;

    const newNode = {
      category: latestCategory,
      item: latestItem,
      subItem,
      ...rest,
    };
    return newNode;
  });
};

const parseCSVFile = async () => {
  const rawData = await parseFile();
  return pipe(remove1stRow, updateFieldHeaders, updateSkillInfo)(rawData);
};

(async () => {
  const grouped = await parseCSVFile();
  fs.writeFile(
    'parsed-data.json',
    JSON.stringify(grouped, null, 2),
    console.error
  );
})();
