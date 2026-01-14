declare module 'next/link' {
  import * as React from 'react';

  export type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
    href: string | URL;
    legacyBehavior?: boolean;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean | 'auto';
  };

  const Link: React.ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/router' {
  // Minimal router types if needed elsewhere
  export function useRouter(): { pathname: string; query: Record<string, any> };
}
