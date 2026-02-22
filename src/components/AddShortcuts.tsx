import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Props = {
  onAddShortcut: (name: string, url: string) => void;
};

export default function AddShortcuts({ onAddShortcut }: Props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!name || !url) {
      alert('Please fill both the Title and URL ');
      return;
    }

    onAddShortcut(name, url);

    setName('');
    setUrl('');
    setOpen(false);
  };

  const handleReset = () => {
    setName('');
    setUrl('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover:bg-white/20 opacity-50 hover:opacity-100 cursor-pointer bg-none rounded-xl w-28 pb-3 h-30 flex flex-col justify-center items-center">
          <Button>
            <div className="bg-[#42414D]/80 flex flex-col shadow-gray-900 shadow-sm justify-center items-center text-white w-16 h-16 rounded-2xl">
              <span className="material-symbols-outlined">add</span>
            </div>
            <p className="text-center text-white">{`Add Shortcuts`}</p>
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-[#42414D] border border-gray-500 rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-white">New shortcut</DialogTitle>
        </DialogHeader>

        <FieldGroup className="flex flex-col gap-4">
          <Field>
            <FieldLabel className="text-white">Title</FieldLabel>
            <Input
              className="text-white"
              placeholder="Enter a Title"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel className="text-white">URL</FieldLabel>
            <Input
              className="text-white"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Type or paste a URL"
            />
          </Field>

          <hr className="border-gray-500 my-2" />

          <Field orientation="horizontal" className="ml-auto gap-2">
            <Button
              className="px-3 py-1 rounded-sm hover:bg-gray-600 cursor-pointer "
              variant="outline"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="px-3 bg-gray-950 text-white hover:bg-gray-300 py-1 rounded-sm hover:text-gray-800 cursor-pointer"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
