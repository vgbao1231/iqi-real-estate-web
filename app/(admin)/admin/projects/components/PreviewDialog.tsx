'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { IntroductionPreview } from '@/app/(admin)/admin/projects/previews/IntroductionPreview';

export function PreviewDialog({ project }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 bg-transparent"
        >
          <Eye className="h-4 w-4" />
          <span>Xem trước</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl p-0 px-1">
        <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle>Xem trước</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto overflow-hidden max-h-[80vh] p-1">
          <IntroductionPreview introduction={project.introduction} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
