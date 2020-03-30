import { observable, computed, action, runInAction } from 'mobx';
import Mock from 'mockjs';

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

function generateSingleGoods() {
  const goodsName = Mock.Random.title();
  const data = Mock.mock({
    id: Mock.Random.guid(),
    goodsName,
    price: Mock.Random.float(0, 1000, 0, 2),
    goodsImgUrl: Mock.Random.dataImage('200x120', goodsName),
  });
  return data;
}

async function generateGoods(n = 10) {
  await delay(1000);
  if (typeof n !== 'number' || n <= 0) {
    return [];
  }
  const arr = [];
  for (let i = 0; i < n; i += 1) {
    arr.push(generateSingleGoods());
  }
  return arr;
}

export default class Store {
  constructor() {
    this.getGoodsList();
  }

  @observable.ref
  goodsList = [];

  @computed
  get total() {
    return this.goodsList.length;
  }

  // 需要使用箭头函数方法，否则取不到 this
  @action
  getGoodsList = async () => {
    const newGoodsList = await generateGoods();
    runInAction(() => {
      this.goodsList = [...this.goodsList, ...newGoodsList];
    });
  };
}
