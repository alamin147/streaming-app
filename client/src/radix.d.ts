declare module "@radix-ui/react-slot" {
    type SlotProps = {
      children?: React.ReactNode
    }
  
    export const Slot: React.FC<SlotProps & React.HTMLAttributes<HTMLElement>>
  }
  
  declare module "@radix-ui/react-tooltip" {
    export const TooltipProvider: React.FC<React.PropsWithChildren<{}>>
    export const Tooltip: React.FC<React.PropsWithChildren<{}>>
    export const TooltipTrigger: React.FC<React.PropsWithChildren<{}>>
    export const TooltipContent: React.FC<React.PropsWithChildren<{}>>
  }
  
  