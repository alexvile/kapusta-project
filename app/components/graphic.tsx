import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

export const Graphic = ({
  selectedCategory,
  transactionType,
  calculatedExpenses,
}: any) => {
  console.log(calculatedExpenses);
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];
  return (
    <div>
      <div>
        Graphic
        <h3>type: {transactionType}</h3>
        <h4>cat: {selectedCategory}</h4>
      </div>
      <div className="w-[400px]">
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </div>
    </div>
  );
};
// todo - styling like design using Victory ???

// if category ALL do we need to show 0 for empty subcategories ??
