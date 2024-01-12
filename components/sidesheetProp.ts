export type SideSheetProps = {
  status: boolean;
  title?: string;
  animation?:
    | "slide-to-right"
    | "slide-to-left"
    | "slide-to-top"
    | "slide-to-bottom";
  outsideClose?: boolean;
  closeButton?: boolean;
  heightAuto?: boolean;
};
