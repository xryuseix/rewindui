import {
  DropdownComponent,
  DropdownContext,
  DropdownProps,
} from '@components/Dropdown/Dropdown.types';
import { DropdownContent } from '@components/Dropdown/DropdownContent/DropdownContent';
import { DropdownDivider } from '@components/Dropdown/DropdownDivider/DropdownDivider';
import { DropdownItem } from '@components/Dropdown/DropdownItem/DropdownItem';
import { DropdownLabel } from '@components/Dropdown/DropdownLabel/DropdownLabel';
import { DropdownTrigger } from '@components/Dropdown/DropdownTrigger/DropdownTrigger';
import { useDropdown } from '@components/Dropdown/use-dropdown.hook';
import { useInputGroupContext } from '@components/InputGroup/InputGroup.context';
import { usePropId } from '@utils/usePropId';
import { forwardRef, Ref } from 'react';
import { DropdownContextProvider } from './Dropdown.context';

const defaultProps: Partial<DropdownProps> = {
  accent: 'solid',
  chevronRotation: true,
  color: 'white',
  initiallyOpen: false,
  itemColor: 'blue',
  mode: 'spacey',
  placement: 'bottom',
  radius: 'md',
  shadow: 'none',
  size: 'md',
  trigger: 'click',
  withChevron: true,
  withinPortal: true,
};

const _Dropdown: DropdownComponent = forwardRef<HTMLDivElement, DropdownProps>(
  (props: DropdownProps, ref?: Ref<HTMLDivElement>) => {
    const {
      accent,
      chevronRotation,
      children,
      color,
      initiallyOpen,
      itemColor,
      mode,
      placement,
      radius,
      shadow,
      size,
      trigger,
      withChevron,
      withinPortal,
      ...additionalProps
    } = {
      ...defaultProps,
      ...useInputGroupContext(),
      ...props,
    };
    const id = usePropId(props.id);
    const {
      arrowRef,
      context,
      floating,
      getFloatingProps,
      getReferenceProps,
      open,
      reference,
      strategy,
      x,
      y,
    } = useDropdown({
      placement,
      initiallyOpen,
      trigger,
    });

    const contextValue: DropdownContext = {
      accent,
      arrowRef,
      chevronRotation,
      color,
      context,
      floating,
      getFloatingProps,
      getReferenceProps,
      itemColor,
      mode,
      open,
      radius,
      reference,
      shadow,
      size,
      strategy,
      withChevron,
      withinPortal,
      x,
      y,
    };

    return (
      <DropdownContextProvider value={contextValue}>
        <div id={id} ref={ref} {...additionalProps}>
          {children}
        </div>
      </DropdownContextProvider>
    );
  }
);

_Dropdown.displayName = 'Dropdown';

export const Dropdown = Object.assign(_Dropdown, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Label: DropdownLabel,
  Divider: DropdownDivider,
  Item: DropdownItem,
});
