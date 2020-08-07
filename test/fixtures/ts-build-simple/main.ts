interface Bear {
  teeth: number;
  type: string;
  children: Bear[];
}

const myBear: Bear = {
  teeth: 10,
  type: 'grizzly',
  children: [{teeth: 11, type: 'grizzly', children: []}],
};

console.log(myBear);
