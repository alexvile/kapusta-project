export const convertToCalendarFormat = (data) => {
  // todo - TS typing
  if (!data.length) return;
  const convertedArray = data.map((el) => {
    const updatedElement = {
      id: el.id,
      title: `${el.description}, ${el.price} UAH, client name`,
      start: el.plannedStartTime,
      end: el.plannedEndTime,
    };
    return updatedElement;
  });

  return convertedArray;
};
