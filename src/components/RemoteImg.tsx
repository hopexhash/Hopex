import { useState, type ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  /** Local asset shown if the remote host 404s, blocks, or goes away. */
  fallback: string;
};

/**
 * Every image on this page is hotlinked from another site, so any of them can
 * disappear without warning. Swapping to a local asset on error keeps a dead
 * link from turning into a broken-image icon in the middle of the layout.
 *
 * `swapped` guards the case where the fallback itself fails — without it the
 * error handler would reassign the same src forever.
 */
export default function RemoteImg({ src, fallback, ...rest }: Props) {
  const [swapped, setSwapped] = useState(false);

  return (
    <img
      {...rest}
      src={swapped ? fallback : src}
      onError={() => setSwapped(true)}
    />
  );
}
