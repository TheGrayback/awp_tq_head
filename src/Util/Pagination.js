export const getPagesCount = (dataCount, pageLimit) => {
  return Math.ceil(dataCount / pageLimit);
};