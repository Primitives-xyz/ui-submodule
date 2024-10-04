'use client'

import { SigmaContainer } from '@react-sigma/core'
import '@react-sigma/core/lib/react-sigma.min.css'
import { useState } from 'react'
import { SocialGraphContent } from './social-graph-content'
import { SocialGraphControls } from './social-graph-controls'
import { SocialGraphLayout } from './social-graph-layout'
import { SocialGraphNodeFocus } from './social-graph-node-focus'
import { INode, IRelationship } from './social-graph.models'

interface Props {
  nodes: INode[]
  relationships: IRelationship[]
  nodeFocusContent?: (nodeId: string) => React.ReactNode
}

export default function SocialGraph({
  nodes,
  relationships,
  nodeFocusContent,
}: Props) {
  const [currentNodeId, setCurrentNodeId] = useState<string>()

  return (
    <SigmaContainer
      className="w-full h-full !bg-transparent relative"
      settings={{
        renderLabels: true,
      }}
    >
      <SocialGraphContent
        nodes={nodes}
        relationships={relationships}
        setCurrentNodeId={setCurrentNodeId}
      />
      <SocialGraphLayout />
      <SocialGraphControls />
      <SocialGraphNodeFocus isOpen={!!currentNodeId && !!nodeFocusContent}>
        {nodeFocusContent?.(currentNodeId ?? '')}
      </SocialGraphNodeFocus>
    </SigmaContainer>
  )
}
