import { IPopulatedRecord } from "~/types/types";

export const convertToCalendarFormat = (data: IPopulatedRecord[]) => {
  if (!data.length) return [];
  const convertedArray = data.map((el) => {
    const updatedElement = {
      id: el.id,
      title: `${el.description}, ${el.price} UAH, ${el.client.firstName} ${el.client.lastName}`,
      start: el.plannedStartTime,
      end: el.plannedEndTime,
    };
    return updatedElement;
  });

  return convertedArray;
};
