import { Dialog, DialogContent } from "@/components/ui/dialog";

const MessageDialog = ({ isOpen, setIsOpen, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="whitespace-pre-line overflow-auto">
        {message}
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
