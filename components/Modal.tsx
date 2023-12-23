import { useOutsideClick } from "@/hooks/useOutsideClick";

const Modal = ({
  children,
  callbackClose,
}: {
  children: React.ReactNode;
  callbackClose: () => void;
}) => {
  const ref = useOutsideClick(() => {
    callbackClose();
  });
  return (
    <>
      <div className="fixed inset-0 z-99999 overflow-y-auto bg-black bg-opacity-50">
        <div className="flex items-center justify-center min-h-screen px-5">
          <div
            className="bg-white rounded-lg shadow-lg lg:w-1/2 sm:w-full"
            ref={ref}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
