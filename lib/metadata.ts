import type { Metadata } from 'next';

import { config } from '@/config';

export const metadata: Metadata = {
  title: `Products | Dashboard | ${config.site.name}`,
};
