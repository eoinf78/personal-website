'use client';

import { useMediaQuery } from './useMediaQuery';

// Keep in sync with the 480px breakpoint in your SCSS
export const MOBILE_QUERY = '(max-width: 480px)';

export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY);
}