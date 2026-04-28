import React from 'react';
import { Heading } from '../components/Heading';
import { VideoCard } from '../components/VideoCard';

export const Works = () => (
  <div style={{ display: 'grid', gap: '4rem' }}>
    <div>
      <Heading>COMBAT MECHANICS</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <VideoCard id="rO4J5l3U5Lo" />
        <VideoCard id="_l11TRglA1I" />
        <VideoCard id="nVBmQ0fFUtY" />
      </div>
    </div>

    <div>
      <Heading>SIMULATOR MECHANICS</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <VideoCard id="7Bs0pgfPBK8" />
        <VideoCard id="iOCmDz_LNQE" />
        <VideoCard id="S0L71Y38Uwc" />
      </div>
    </div>

    <div>
      <Heading>OTHER PROJECTS</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <VideoCard id="055kJAaGuLQ" />
        <VideoCard id="l2Cj_PuaaJk" />
        <VideoCard id="5K43AhBDpXQ" />
      </div>
    </div>
  </div>
);
