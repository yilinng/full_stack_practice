import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import SelectType from './SelectType';


interface Props {
  modalOpen: boolean;
  onClose: (data: string) => void;
  error?: string;
  setType: React.Dispatch<React.SetStateAction<string>>
  setNextClick: React.Dispatch<React.SetStateAction<boolean>>
}

const AddEntryModal = ({ modalOpen, onClose, error, setType, setNextClick }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose('')}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <SelectType onCancel={onClose} setType={setType} setNextClick={setNextClick} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
