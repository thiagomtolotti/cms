import type { components } from "@/types/api";

interface RechartsSankeyData {
  nodes: { name: string }[];
  links: { source: number; target: number; value: number }[];
}

export default function transformSankeyData(
  apiData: components["schemas"]["GetSankeyResponseDTO"],
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
