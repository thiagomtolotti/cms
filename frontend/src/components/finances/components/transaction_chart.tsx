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

  const palette = [
    "#4f46e5",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  const fillColor =
    // @ts-expect-error color
    (payload && (payload.color as string)) || palette[index % palette.length];

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
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
