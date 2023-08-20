import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

export const Graphic = ({
  selectedCategory,
  transactionType,
  calculatedTransactions,
}: any) => {
  console.log(calculatedTransactions);
  return (
    <div>
      <div>
        Graphic build
        <h3>type: {transactionType}</h3>
        <h4>cat: {selectedCategory}</h4>
      </div>
      <div className="w-[400px]">
        <VictoryChart
          domainPadding={{ x: 40 }}
          // theme={VictoryTheme.material}
        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            // tickValues={["CONSUMABLES", "RENT", "COMMUNAL", "OTHER"]}
            // tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            style={{
              axis: { stroke: "#000" },
              tickLabels: { fontSize: 11, padding: 10 },
            }}
          />
          {/* should be hidden */}
          {/* <VictoryAxis
            dependentAxis

            // tickFormat={(x) => `$${x / 1000}k`}
          /> */}
          <VictoryBar
            // barRatio={0.8}
            data={calculatedTransactions}
            x="type"
            y="value"
            style={{
              data: {
                fill: ({ index }) => (+index % 3 === 0 ? "#FF751D" : "#FFDAC0"),
              },
              labels: {
                // fontSize: 12,
              },
            }}
            alignment="middle"
            // categories={{ x: ["MARKETING", "COMMUNAL", "RENT"] }}
            // cornerRadius={{ topLeft: ({ datum }) => datum.x * 4 }}
            labels={({ datum }) => `${datum.value} UAH`}
            cornerRadius={5}
            // animate={{
            //   duration: 250,
            //   onLoad: { duration: 250 },
            // }}
            // hardcoded barwidth

            // domain={{ x: [0, 6] }}
            barWidth={30}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

// todo - if 0 - just show image - Instead Graphic - Nothing found
// todo - range graphic from big to small values

// todo - styling like design using Victory ???
// todo - when select subcategory - should show types (to incomes only)
// if category ALL do we need to show 0 for empty subcategories ??
// todo - find all any and replace to types
// todo - event - by click - select and summ
