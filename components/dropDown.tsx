import React from "react";

// Custom hook to detect clicks outside an element
function useOutsideAlerter(
  ref: React.RefObject<HTMLElement | null>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
): void {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && event.target instanceof Node && 
          !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpen]);
}

interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  classNames?: string;
  animation?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  button,
  children,
  classNames = "",
  animation
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  
  useOutsideAlerter(wrapperRef, setIsOpen);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div 
        className="flex" 
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      >
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation || "origin-top-right transition-all duration-300 ease-in-out"
        } ${isOpen ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;