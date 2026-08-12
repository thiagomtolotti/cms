import {
  ResponsiveContainer,
  Sankey,
  Tooltip,
  useChartWidth,
  Layer,
  Rectangle,
} from "recharts";
import type { NodeProps } from "recharts/types/chart/Sankey";

import useSankeyData from "../hooks/useSankeyData";

function MyCustomSankeyNode({
  x,
  y,
  width,
  height,
  index,
  payload,
}: NodeProps) {
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

const SankeyCustomNodeExample = () => {
  const { data } = useSankeyData();

  if (!data) return "Carregando...";

  return (
    <ResponsiveContainer width="100%" aspect={2} className="px-12 my-8">
      <Sankey
        data={data}
        node={MyCustomSankeyNode}
        nodePadding={50}
        margin={{
          bottom: 30,
        }}
        link={{ stroke: "var(--color-muted-foreground)" }}
        align="left"
      >
        <Tooltip />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default SankeyCustomNodeExample;
