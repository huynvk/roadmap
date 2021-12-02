const csv = require('csvtojson');
const { pipe } = require('ramda');
const fs = require('fs');

const fieldsMapping = {
  field1: 'category',
  field2: 'item',
  field3: 'subItem',
  field4: 'skillType',
  field5: 'description',
  field6: 'reference',
  FE: 'feJunior',
  field8: 'feMid',
  field9: 'feSenior',
  'Full Stack': 'fsJunior',
  field11: 'fsMid',
  field12: 'fsSenior',
  BE: 'beJunior',
  field14: 'beMid',
  field15: 'beSenior',
  DevOps: 'doJunior',
  field17: 'doMid',
  field18: 'doSenior',
  QC: 'qcJunior',
  field19: 'qcMid',
  field20: 'qcSenior',
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
