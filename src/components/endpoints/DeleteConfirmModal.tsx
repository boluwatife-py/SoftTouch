import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isDeleting }: DeleteConfirmModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#1B263B] text-white border-gray-700">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
            </div>
          </div>
          <AlertDialogTitle className="text-xl font-medium text-white text-center">Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription className="text-[#D3D3D3] text-center">
            Are you sure you want to delete this endpoint? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center space-x-3">
          <AlertDialogCancel 
            className="bg-gray-700 hover:bg-gray-600 text-white"
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmModal;
