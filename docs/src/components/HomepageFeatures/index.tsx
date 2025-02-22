import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    image: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Start building Web3 apps in minutes with our intuitive hooks and components.
        No complex setup required.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    image: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Let ethers-query handle the complexities of blockchain interactions
        while you focus on building great user experiences.
      </>
    ),
  },
  {
    title: 'Powered by React Query',
    image: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Enjoy automatic caching, real-time updates, and optimistic UI
        with the battle-tested React Query library.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
