import {
  ResponsiveContainer,
  Sankey,
  Tooltip,
  useChartWidth,
  Layer,
  Rectangle,
} from "recharts";

// #region Sample data
const data0 = {
  nodes: [
    { name: "Salário" },
    { name: "VA" },
    { name: "Entradas" },
    { name: "Aluguel" },
    { name: "Contas" },
    { name: "Cartão de crédito" },
    { name: "Terapia" },
    { name: "Terapia de casal" },
  ],
  links: [
    { source: 0, target: 2, value: 4800 },
    { source: 1, target: 2, value: 600 },
    { source: 2, target: 3, value: 1363 },
    { source: 2, target: 4, value: 0 },
    { source: 2, target: 5, value: 0 },
    { source: 2, target: 6, value: 400 },
    { source: 2, target: 7, value: 120 },
  ],
};

function MyCustomSankeyNode({ x, y, width, height, index, payload }: any) {
  const containerWidth = useChartWidth();

  if (containerWidth == null) {
    return null;
  }

  const isOut = x + width + 6 > containerWidth;

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={"var(--primary)"}
        fillOpacity="1"
      />
      <text
        textAnchor={isOut ? "end" : "start"}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        fontSize="14"
        stroke={"var(--color-muted-foreground)"}
      >
        {payload.name}
      </text>
      <text
        textAnchor={isOut ? "end" : "start"}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2 + 13}
        fontSize="12"
        stroke={"var(--color-muted-foreground)"}
        strokeOpacity="0.5"
      >
        {`R$ ${payload.value}`}
      </text>
    </Layer>
  );
}

const SankeyCustomNodeExample = () => (
  <ResponsiveContainer width="100%" aspect={2} className="px-12 my-8">
    <Sankey
      data={data0}
      node={MyCustomSankeyNode}
      nodePadding={50}
      margin={{
        bottom: 30,
      }}
      link={{ stroke: "var(--color-muted-foreground)" }}
    >
      <Tooltip />
    </Sankey>
  </ResponsiveContainer>
);

export default SankeyCustomNodeExample;
