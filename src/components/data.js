const maketask = () => {
  return {
    description: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)],
    dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 100,
    tags: new Set([
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`
    ]),
    isRepeating: true,
    repeatingDays: {
      'mo': false,
      'tu': false,
      'we': Boolean(Math.round(Math.random())),
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    },
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`,
    ][Math.floor(Math.random() * 5)],
    isFavorite: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random()))
  };
};
/* const allTasks = [];
for (let i = 0; i < 27; i++) {
  allTasks.push(maketask());
} */
const taskMocks = new Array(8).fill(``).map(maketask);
export {taskMocks};
