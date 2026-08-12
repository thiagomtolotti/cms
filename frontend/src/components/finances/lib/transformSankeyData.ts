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

  apiData.links.forEach((link) => {
    links.push({
      source: nodeMap[link.source],
      target: nodeMap[link.target],
      value: link.value,
    });
  });

  return { nodes, links };
}
