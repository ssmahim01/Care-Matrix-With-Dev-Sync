import { Dialog, DialogContent } from "@/components/ui/dialog";

const MessageDialog = ({ isOpen, setIsOpen, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="whitespace-pre-line">
        {message}
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
