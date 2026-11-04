import Link from "next/link";
import { ReactElement } from "react";
import { Button } from "./Button";
import { Icon } from "./icon";

export type DownloadButtonProps = {
  variant: 'primary' | 'text' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fileName: string;
}

export const DownloadButton = ({fileName, size, variant}: DownloadButtonProps): ReactElement => {
  return <Button asChild variant={variant} size={size}>
    <Link href={`/files/${fileName}.pdf`} download={`${fileName}.pdf`}>
      <span className="Button__label"><Icon name="download"/>{size === 'small' ? 'CV' : 'Download my CV'}</span>
    </Link>
  </Button>
}