import Link from "next/link";
import { ReactElement } from "react";
import { Button } from "./Button";

export type DownloadButtonProps = {
  variant: 'primary' | 'text' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fileName: string;
}

export const DownloadButton = ({fileName, size, variant}: DownloadButtonProps): ReactElement => {
  return <Link href={`/files/${fileName}.pdf`} download={`${fileName}.pdf`}>
    <Button variant={variant} icon='download' size={size}>{size === 'small' ? 'CV' : 'Download my CV'}</Button>
  </Link>
}