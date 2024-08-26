'use client'

import { SigmaContainer } from '@react-sigma/core'
import { SocialGraphContent, SocialGraphProps } from './social-graph-content'
import { SocialGraphControls } from './social-graph-controls'
import { SocialGraphLayout } from './social-graph-layout'

export default function SocialGraph({
  nodes,
  relationships,
}: SocialGraphProps) {
  return (
    <SigmaContainer
      className="w-full h-full !bg-transparent"
      // style={{
      //   width: '100%',
      //   height: '100%',
      // }}
      settings={{
        allowInvalidContainer: true,
        // renderLabels: false,
      }}
    >
      <SocialGraphContent nodes={nodes} relationships={relationships} />
      <SocialGraphLayout />
      <SocialGraphControls />
      {/* <SocialGraphNodeFocus username={currentUsername} /> */}
    </SigmaContainer>
  )
}
