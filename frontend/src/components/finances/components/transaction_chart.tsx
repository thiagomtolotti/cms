import type { components } from "@/types/api";
import client from "@/types/client";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  Sankey,
  Tooltip,
  useChartWidth,
  Layer,
  Rectangle,
} from "recharts";
import type { NodeProps } from "recharts/types/chart/Sankey";

interface RechartsSankeyData {
  nodes: { name: string }[];
  links: { source: number; target: number; value: number }[];
}

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
      >
        <Tooltip />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default SankeyCustomNodeExample;

function useSankeyData() {
  return useQuery({
    queryKey: ["sankey"],
    queryFn: async () => await fetchSankeyData(),
    select: (data) => transformSankeyData(data),
  });
}

// TODO: handle 'Faltante' and 'Excedente'

interface SankeyEndpointResponse {
  nodes: {
    id: string;
    label: string;
    targets?: {
      id: string;
      value: number;
    }[];
  }[];
}

async function fetchSankeyData(): Promise<
  components["schemas"]["GetSankeyResponseDTO"]
> {
  const { data } = await client.GET("/api/finance/sankey");

  return data!;
}

function transformSankeyData(
  apiData: SankeyEndpointResponse,
): RechartsSankeyData {
  const nodeMap: Record<string, number> = {};
  const nodes: { name: string }[] = [];
  const links: { source: number; target: number; value: number }[] = [];

  apiData.nodes.forEach((node, index) => {
    nodeMap[node.id] = index;
    nodes.push({ name: node.label });
  });

  apiData.nodes.forEach((node) => {
    if (node.targets) {
      node.targets.forEach((target) => {
        links.push({
          source: nodeMap[node.id],
          target: nodeMap[target.id],
          value: target.value,
        });
      });
    }
  });

  return { nodes, links };
}

// Entradas (tipo) -> Entradas (categorias) -> Saídas (categorias) -> Saídas (tipo)
