import { EthersAdapter } from '@reown/appkit-adapter-ethers';

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// Create the Ethers adapter
export const ethersAdapter = new EthersAdapter();

// Set up metadata
export const metadata = {
  name: 'Ethers Query Example',
  description: 'Example app using ethers-query',
  url: 'http://localhost:3000', // Update this for production
  icons: ['https://docs.ethers.org/v6/static/logo.svg']
};