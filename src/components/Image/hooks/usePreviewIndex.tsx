import * as React from 'react';

export default function usePreviewIndex(
  src: string,
  urls: string[],
) {
  const [index, setIndex] = React.useState(urls.indexOf(src));

  React.useEffect(() => {
    if (index !== urls.indexOf(src)) {
      setIndex(urls.indexOf(src));
    }
  }, [src]);

  return [index, setIndex] as const;
}