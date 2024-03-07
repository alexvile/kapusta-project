type RowPlaceholderProps = {
  columns?: number;
  rows: number;
};
export const RowPlaceholder = ({ columns = 6, rows }: RowPlaceholderProps) => {
  if (rows === 0) return null;
  // todo: refactor this shit
  const getArr = (rows: number) => {
    let arr = [];
    for (let index = 0; index < rows; index++) {
      arr.push(index);
    }
    return arr;
  };
  const rows1 = getArr(rows);

  return (
    <>
      {rows1.map((e) => (
        <tr key={e} className="border-2 border-tableBorder">
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      ))}
    </>
  );
};
