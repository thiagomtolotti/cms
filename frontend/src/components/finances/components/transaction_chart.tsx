import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  Sankey,
  Tooltip,
  useChartWidth,
  Layer,
  Rectangle,
} from "recharts";

interface RechartsSankeyData {
  nodes: { name: string }[];
  links: { source: number; target: number; value: number }[];
}

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
    queryKey: ["sankeyData"],
    queryFn: async () => await mockFetchSankeyData(),
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

function mockFetchSankeyData(): Promise<SankeyEndpointResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nodes: [
          {
            id: "salario",
            label: "Salário",
            targets: [{ id: "entradas", value: 4800 }],
          },
          {
            id: "va",
            label: "VA",
            targets: [{ id: "entradas", value: 600 }],
          },
          {
            id: "entradas",
            label: "Entradas",
            targets: [
              { id: "aluguel", value: 1363 },
              { id: "contas", value: 350 },
              { id: "terapia", value: 520 },
            ],
          },
          {
            id: "contas",
            label: "Contas",
            targets: [
              { id: "luz", value: 150 },
              { id: "internet", value: 200 },
            ],
          },
          { id: "aluguel", label: "Aluguel" },
          { id: "luz", label: "Luz" },
          { id: "internet", label: "Internet" },
        ],
      });
    }, 500);
  });
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
