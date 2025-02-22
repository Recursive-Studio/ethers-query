import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';

const quickStartCode = `import { EthersQueryProvider, Client } from 'ethers-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new Client({
  connectors: [new InjectedConnector()]
})

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EthersQueryProvider client={client}>
        <YourApp />
      </EthersQueryProvider>
    </QueryClientProvider>
  )
}`

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero hero--primary">
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className="buttons">
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="React Query hooks for ethers.js - Build Web3 apps with ease">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6">
              <h2>Simple. Powerful. Type-safe.</h2>
              <p>
                ethers-query combines the power of ethers.js with the elegant caching and state management of React Query.
                Build Web3 applications with confidence using our type-safe hooks and components.
              </p>
              <h3>Features</h3>
              <ul>
                <li>🔌 Easy wallet integration</li>
                <li>📊 Smart contract interactions</li>
                <li>💾 Automatic caching</li>
                <li>🔄 Real-time updates</li>
                <li>📝 Message signing</li>
                <li>🛠️ Full TypeScript support</li>
              </ul>
            </div>
            <div className="col col--6">
              <div className="code-showcase">
                <CodeBlock language="tsx" title="Quick Start">
                  {quickStartCode}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
