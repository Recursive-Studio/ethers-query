/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/app-kit',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/wallet-connection',
        'guides/smart-contracts',
        'guides/message-signing',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/hooks',
        'api/components',
        'api/types',
      ],
    },
  ],
}; 