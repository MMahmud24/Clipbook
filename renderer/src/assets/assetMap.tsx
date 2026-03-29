import React from 'react'

const RouterSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
    <line x1="130" y1="130" x2="110" y2="50" stroke="#a0aec0" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="110" cy="48" r="4" fill="#a0aec0"/>
    <line x1="270" y1="130" x2="290" y2="50" stroke="#a0aec0" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="290" cy="48" r="4" fill="#a0aec0"/>
    <rect x="60" y="130" width="280" height="90" rx="12" ry="12" fill="#2d3748" stroke="#4a5568" strokeWidth="2"/>
    <line x1="150" y1="138" x2="150" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="162" y1="138" x2="162" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="174" y1="138" x2="174" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="186" y1="138" x2="186" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="198" y1="138" x2="198" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="210" y1="138" x2="210" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="222" y1="138" x2="222" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="234" y1="138" x2="234" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="246" y1="138" x2="246" y2="148" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
    <line x1="75" y1="185" x2="325" y2="185" stroke="#4a5568" strokeWidth="1"/>
    <g id="power_button">
      <circle cx="95" cy="163" r="11" fill="none" stroke="#68d391" strokeWidth="2"/>
      <line x1="95" y1="153" x2="95" y2="163" stroke="#68d391" strokeWidth="2" strokeLinecap="round"/>
      <text x="95" y="205" textAnchor="middle" fontSize="9" fill="#718096" fontFamily="sans-serif">POWER</text>
    </g>
    <g id="wifi_led">
      <path d="M148 168 Q155 158 162 168" fill="none" stroke="#63b3ed" strokeWidth="2" strokeLinecap="round"/>
      <path d="M144 172 Q155 156 166 172" fill="none" stroke="#63b3ed" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="155" cy="170" r="2.5" fill="#63b3ed"/>
      <text x="155" y="205" textAnchor="middle" fontSize="9" fill="#718096" fontFamily="sans-serif">WLAN</text>
    </g>
    <g id="ethernet_ports">
      <rect x="195" y="153" width="18" height="14" rx="2" fill="#1a202c" stroke="#63b3ed" strokeWidth="1.5"/>
      <rect x="218" y="153" width="18" height="14" rx="2" fill="#1a202c" stroke="#63b3ed" strokeWidth="1.5"/>
      <rect x="241" y="153" width="18" height="14" rx="2" fill="#1a202c" stroke="#63b3ed" strokeWidth="1.5"/>
      <rect x="264" y="153" width="18" height="14" rx="2" fill="#1a202c" stroke="#63b3ed" strokeWidth="1.5"/>
      <text x="232" y="205" textAnchor="middle" fontSize="9" fill="#718096" fontFamily="sans-serif">LAN</text>
    </g>
    <g id="reset_button">
      <circle cx="305" cy="163" r="5" fill="#e53e3e"/>
      <text x="305" y="205" textAnchor="middle" fontSize="9" fill="#718096" fontFamily="sans-serif">RESET</text>
    </g>
    <g id="power_port">
      <circle cx="325" cy="163" r="6" fill="#1a202c" stroke="#a0aec0" strokeWidth="1.5"/>
      <circle cx="325" cy="163" r="2" fill="#a0aec0"/>
      <text x="325" y="205" textAnchor="middle" fontSize="9" fill="#718096" fontFamily="sans-serif">DC</text>
    </g>
  </svg>
)

const SmartSpeakerSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <path d="M110,155 L110,320 Q110,345 200,345 Q290,345 290,320 L290,155 Z" fill="#2d3748" stroke="#4a5568" strokeWidth="2"/>
    <ellipse cx="200" cy="155" rx="90" ry="28" fill="#3d4a5c" stroke="#4a5568" strokeWidth="2"/>
    <g id="status_ring">
      <ellipse cx="200" cy="155" rx="90" ry="28" fill="none" stroke="#4dd0e1" strokeWidth="4" opacity="0.9"/>
    </g>
    <g id="top_button">
      <ellipse cx="200" cy="152" rx="60" ry="18" fill="#2d3748" stroke="#555f6e" strokeWidth="1.5"/>
      <circle cx="200" cy="141" r="9" fill="#3d4a5c" stroke="#a0aec0" strokeWidth="1"/>
      <circle cx="200" cy="141" r="5" fill="none" stroke="#a0aec0" strokeWidth="1.2"/>
      <line x1="200" y1="136" x2="200" y2="141" stroke="#a0aec0" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="175" cy="152" r="9" fill="#3d4a5c" stroke="#a0aec0" strokeWidth="1"/>
      <line x1="170" y1="152" x2="180" y2="152" stroke="#a0aec0" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="225" cy="152" r="9" fill="#3d4a5c" stroke="#a0aec0" strokeWidth="1"/>
      <line x1="220" y1="152" x2="230" y2="152" stroke="#a0aec0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="225" y1="147" x2="225" y2="157" stroke="#a0aec0" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="200" cy="163" r="9" fill="#3d4a5c" stroke="#a0aec0" strokeWidth="1"/>
      <rect x="197" y="157" width="6" height="8" rx="3" fill="none" stroke="#a0aec0" strokeWidth="1"/>
      <line x1="200" y1="166" x2="200" y2="169" stroke="#a0aec0" strokeWidth="1" strokeLinecap="round"/>
      <line x1="197" y1="169" x2="203" y2="169" stroke="#a0aec0" strokeWidth="1" strokeLinecap="round"/>
    </g>
    <g fill="#4a5568" opacity="0.8">
      <circle cx="128" cy="198" r="2"/><circle cx="140" cy="200" r="2"/><circle cx="152" cy="201" r="2"/>
      <circle cx="164" cy="202" r="2"/><circle cx="176" cy="203" r="2"/><circle cx="188" cy="204" r="2"/>
      <circle cx="200" cy="204" r="2"/><circle cx="212" cy="204" r="2"/><circle cx="224" cy="203" r="2"/>
      <circle cx="236" cy="202" r="2"/><circle cx="248" cy="201" r="2"/><circle cx="260" cy="200" r="2"/>
      <circle cx="272" cy="198" r="2"/>
      <circle cx="128" cy="212" r="2"/><circle cx="140" cy="214" r="2"/><circle cx="152" cy="215" r="2"/>
      <circle cx="164" cy="216" r="2"/><circle cx="176" cy="217" r="2"/><circle cx="188" cy="218" r="2"/>
      <circle cx="200" cy="218" r="2"/><circle cx="212" cy="218" r="2"/><circle cx="224" cy="217" r="2"/>
      <circle cx="236" cy="216" r="2"/><circle cx="248" cy="215" r="2"/><circle cx="260" cy="214" r="2"/>
      <circle cx="272" cy="212" r="2"/>
      <circle cx="128" cy="226" r="2"/><circle cx="140" cy="228" r="2"/><circle cx="152" cy="229" r="2"/>
      <circle cx="164" cy="230" r="2"/><circle cx="176" cy="231" r="2"/><circle cx="188" cy="232" r="2"/>
      <circle cx="200" cy="232" r="2"/><circle cx="212" cy="232" r="2"/><circle cx="224" cy="231" r="2"/>
      <circle cx="236" cy="230" r="2"/><circle cx="248" cy="229" r="2"/><circle cx="260" cy="228" r="2"/>
      <circle cx="272" cy="226" r="2"/>
      <circle cx="128" cy="240" r="2"/><circle cx="140" cy="242" r="2"/><circle cx="152" cy="243" r="2"/>
      <circle cx="164" cy="244" r="2"/><circle cx="176" cy="245" r="2"/><circle cx="188" cy="246" r="2"/>
      <circle cx="200" cy="246" r="2"/><circle cx="212" cy="246" r="2"/><circle cx="224" cy="245" r="2"/>
      <circle cx="236" cy="244" r="2"/><circle cx="248" cy="243" r="2"/><circle cx="260" cy="242" r="2"/>
      <circle cx="272" cy="240" r="2"/>
      <circle cx="128" cy="254" r="2"/><circle cx="140" cy="256" r="2"/><circle cx="152" cy="257" r="2"/>
      <circle cx="164" cy="258" r="2"/><circle cx="176" cy="259" r="2"/><circle cx="188" cy="260" r="2"/>
      <circle cx="200" cy="260" r="2"/><circle cx="212" cy="260" r="2"/><circle cx="224" cy="259" r="2"/>
      <circle cx="236" cy="258" r="2"/><circle cx="248" cy="257" r="2"/><circle cx="260" cy="256" r="2"/>
      <circle cx="272" cy="254" r="2"/>
      <circle cx="128" cy="268" r="2"/><circle cx="140" cy="270" r="2"/><circle cx="152" cy="271" r="2"/>
      <circle cx="164" cy="272" r="2"/><circle cx="176" cy="273" r="2"/><circle cx="188" cy="274" r="2"/>
      <circle cx="200" cy="274" r="2"/><circle cx="212" cy="274" r="2"/><circle cx="224" cy="273" r="2"/>
      <circle cx="236" cy="272" r="2"/><circle cx="248" cy="271" r="2"/><circle cx="260" cy="270" r="2"/>
      <circle cx="272" cy="268" r="2"/>
    </g>
    <g id="power_port">
      <rect x="187" y="338" width="26" height="8" rx="3" fill="#1a202c" stroke="#a0aec0" strokeWidth="1.5"/>
      <circle cx="200" cy="342" r="2" fill="#a0aec0"/>
    </g>
  </svg>
)

export const assetMap: Record<string, React.ReactNode> = {
  router_svg: <RouterSVG />,
  smart_speaker_svg: <SmartSpeakerSVG />,
}

export function getAsset(key: string): React.ReactNode {
  return assetMap[key] ?? null
}
