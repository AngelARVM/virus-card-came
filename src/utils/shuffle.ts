const shuffle = <T>(list: Array<T>): Array<T> => {
  const listCopy: Array<T> = [...list];

    let currentIndex: number = list.length,  randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [listCopy[currentIndex], listCopy[randomIndex]] = [
        listCopy[randomIndex], listCopy[currentIndex]
      ];
    }

    return listCopy;
  }

  export default shuffle;