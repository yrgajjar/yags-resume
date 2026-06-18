import type { ResumeData, Settings } from '../types'

// ---------------------------------------------------------------------------
// Bundled seed data. The public resume renders this instantly when Firebase
// is not configured (or before the Firestore docs exist). Once an admin saves
// from the panel, these values are written to Firestore and become editable.
// ---------------------------------------------------------------------------

export const defaultResume: ResumeData = {
  hero: {
    name: 'Yagnesh Gajjar',
    role: 'IT Administrator / System Engineer',
    tagline:
      'I design, secure and automate resilient infrastructure — keeping networks fast, systems healthy and teams unblocked.',
    avatarUrl: '',
    counters: [
      { id: 'c1', label: 'Years experience', value: 8, suffix: '+' },
      { id: 'c2', label: 'Systems managed', value: 240, suffix: '+' },
      { id: 'c3', label: 'Uptime delivered', value: 99, suffix: '.9%' },
      { id: 'c4', label: 'Certifications', value: 6, suffix: '' },
    ],
  },
  about: {
    summary:
      '<p>System engineer and IT administrator with <strong>8+ years</strong> keeping enterprise infrastructure secure, observable and fast. I specialise in <strong>networking</strong>, <strong>cloud</strong> and <strong>security</strong> — from designing zero-downtime migrations to automating the boring stuff with Infrastructure-as-Code.</p><p>I care about clean runbooks, least-privilege access and dashboards that catch problems before users do.</p>',
  },
  skillCategories: [
    {
      id: 'cat-net',
      name: 'Networking',
      skills: [
        { id: 's1', name: 'TCP/IP & Routing', level: 92 },
        { id: 's2', name: 'Firewalls (pfSense / Fortinet)', level: 88 },
        { id: 's3', name: 'VPN & VLAN design', level: 85 },
        { id: 's4', name: 'Load balancing', level: 80 },
      ],
    },
    {
      id: 'cat-cloud',
      name: 'Cloud',
      skills: [
        { id: 's5', name: 'AWS (EC2, S3, IAM, VPC)', level: 87 },
        { id: 's6', name: 'Azure AD / Entra', level: 82 },
        { id: 's7', name: 'Terraform', level: 78 },
        { id: 's8', name: 'Docker & Kubernetes', level: 75 },
      ],
    },
    {
      id: 'cat-sec',
      name: 'Security',
      skills: [
        { id: 's9', name: 'Identity & Access Mgmt', level: 90 },
        { id: 's10', name: 'SIEM & Monitoring', level: 83 },
        { id: 's11', name: 'Hardening & Compliance', level: 80 },
        { id: 's12', name: 'Incident response', level: 79 },
      ],
    },
    {
      id: 'cat-ops',
      name: 'Operations',
      skills: [
        { id: 's13', name: 'Linux administration', level: 91 },
        { id: 's14', name: 'Windows Server / AD', level: 86 },
        { id: 's15', name: 'Bash / PowerShell', level: 84 },
        { id: 's16', name: 'CI/CD & Automation', level: 77 },
      ],
    },
  ],
  experience: [
    {
      id: 'exp1',
      company: 'NorthBridge Technologies',
      role: 'Senior System Engineer',
      start: '2021',
      end: 'Present',
      location: 'Remote',
      description:
        '<ul><li>Led a zero-downtime migration of 120+ workloads to AWS, cutting hosting costs by <strong>34%</strong>.</li><li>Built Terraform modules and CI/CD pipelines that reduced provisioning time from days to minutes.</li><li>Introduced centralised logging + alerting, lifting mean-time-to-detect by <strong>60%</strong>.</li></ul>',
    },
    {
      id: 'exp2',
      company: 'Helix Managed Services',
      role: 'IT Administrator',
      start: '2018',
      end: '2021',
      location: 'Ahmedabad, IN',
      description:
        '<ul><li>Managed Active Directory, Microsoft 365 and endpoint security for 500+ users.</li><li>Designed segmented VLANs and firewall policies, eliminating recurring outages.</li><li>Automated patching and backups, achieving verified <strong>99.9%</strong> uptime.</li></ul>',
    },
    {
      id: 'exp3',
      company: 'BlueWave Solutions',
      role: 'Network & Support Engineer',
      start: '2016',
      end: '2018',
      location: 'Ahmedabad, IN',
      description:
        '<ul><li>First-line and escalation support across networking, servers and desktops.</li><li>Rolled out a ticketing system and knowledge base that cut repeat tickets by <strong>40%</strong>.</li></ul>',
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'Gujarat Technological University',
      degree: 'B.E. in Information Technology',
      start: '2012',
      end: '2016',
      description: 'Graduated with distinction. Focus on networks and systems.',
    },
  ],
  certifications: [
    { id: 'cert1', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', date: '2023', credentialUrl: '' },
    { id: 'cert2', name: 'CompTIA Security+', issuer: 'CompTIA', date: '2022', credentialUrl: '' },
    { id: 'cert3', name: 'Cisco CCNA', issuer: 'Cisco', date: '2020', credentialUrl: '' },
    { id: 'cert4', name: 'Microsoft Certified: Azure Administrator', issuer: 'Microsoft', date: '2021', credentialUrl: '' },
  ],
  contact: {
    email: 'hello@example.com',
    phone: '+91 90000 00000',
    location: 'Ahmedabad, India',
    linkedin: 'https://linkedin.com/in/example',
    github: 'https://github.com/yrgajjar',
    website: '',
  },
  highlights: [
    { id: 'h1', label: 'Open to opportunities' },
    { id: 'h2', label: 'Cloud & Security' },
    { id: 'h3', label: 'Automation-first' },
  ],
}

export const defaultSettings: Settings = {
  theme: {
    primary: '#6366f1',
    secondary: '#06b6d4',
    mode: 'dark',
    font: 'jakarta',
  },
  sections: [
    { id: 'about', enabled: true },
    { id: 'skills', enabled: true },
    { id: 'experience', enabled: true },
    { id: 'education', enabled: true },
    { id: 'certifications', enabled: true },
    { id: 'contact', enabled: true },
  ],
  interactive: {
    animations: true,
    counters: true,
  },
}
