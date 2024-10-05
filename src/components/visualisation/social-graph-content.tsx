'use client'

import { useCamera, useLoadGraph, useRegisterEvents } from '@react-sigma/core'
import Graph from 'graphology'
import { useEffect } from 'react'
import { EDGE_SIZE, NODE_SIZE } from './social-graph.constants'
import { INode, IRelationship } from './social-graph.models'

export interface SocialGraphProps {
  nodes: INode[]
  relationships: IRelationship[]
  setCurrentNodeId: (id?: string) => void
}

export function SocialGraphContent({
  nodes,
  relationships,
  setCurrentNodeId,
}: SocialGraphProps) {
  const loadGraph = useLoadGraph()
  const registerEvents = useRegisterEvents()
  const { zoomIn, gotoNode } = useCamera()

  useEffect(() => {
    const graph = new Graph({
      multi: true,
    })

    const nodesSet = new Set<string>()
    const edgeSet = new Set<string>()

    nodes.forEach((node) => {
      if (nodesSet.has(node.id)) {
        return
      }
      nodesSet.add(node.id)

      graph.addNode(node.id, {
        size: NODE_SIZE,
        label: node.caption,
        // color: node.color ?? '#ffffff',
      })
    })

    relationships.forEach((rel) => {
      if (
        edgeSet.has(rel.id) ||
        !nodesSet.has(rel.from) ||
        !nodesSet.has(rel.to)
      ) {
        return
      }
      edgeSet.add(rel.id)

      graph.addEdge(rel.from, rel.to, {
        type: 'arrow',
        size: EDGE_SIZE,
        // color: rel.color ?? '#ffffff',
      })
    })

    graph.nodes().forEach((node, i) => {
      const angle = (i * 2 * Math.PI) / graph.order
      graph.setNodeAttribute(node, 'x', 100 * Math.cos(angle))
      graph.setNodeAttribute(node, 'y', 100 * Math.sin(angle))
    })

    registerEvents({
      clickNode: (event) => {
        const nodeId = event.node
        // const nodeData = graph.getNodeAttributes(nodeId)

        gotoNode(nodeId)
        setCurrentNodeId(nodeId)
      },
      clickStage: () => {
        setCurrentNodeId(undefined)
      },
      enterNode: () => {
        document.body.style.cursor = 'pointer'
      },
      leaveNode: () => {
        document.body.style.cursor = 'default'
      },
    })

    loadGraph(graph)
  }, [loadGraph, nodes, relationships, registerEvents, gotoNode, zoomIn, setCurrentNodeId])

  return null
}
