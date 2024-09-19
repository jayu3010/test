import moment from 'moment';
import randomColor from 'randomcolor';
import moviesOscars from './data/movies-oscars.json';
import moviesMarvel from './data/movies-marvel.json';

let id = 1;

interface Group {
  id: number;
  title: string;
}

interface Item {
  id: number;
  group: number;
  start_time: moment.Moment;
  end_time: moment.Moment;
  title: string;
  canMove: boolean;
  canResize: boolean;
  itemProps?: {
    style?: React.CSSProperties;
  };
}

export const groupIds = {
  moviesOscars: 50,
  moviesMarvel: 52,
};

export const groups: Group[] = [
  { id: groupIds.moviesOscars, title: 'Best Picture' },
  { id: groupIds.moviesMarvel, title: 'Marvel movies (MCU)' },
];

const createItem = (el: any, i: number, ary: any[], groupId: number): Item => ({
  id: id++,
  group: groupId,
  title: el.title,
  canMove: true,
  canResize: true,
  start_time: moment(el.start_time),
  end_time: moment(el.start_time).add(2, 'hours'), // Arbitrary duration for the example
  itemProps: {
    style: {
      backgroundColor: randomColor({ luminosity: 'light', seed: el.title }),
      color: 'black',
    },
  },
});

export let items: Item[] = [
  ...moviesOscars.map((el, i, ary) => createItem(el, i, ary, groupIds.moviesOscars)),
  ...moviesMarvel.map((el, i, ary) => createItem(el, i, ary, groupIds.moviesMarvel)),
];
