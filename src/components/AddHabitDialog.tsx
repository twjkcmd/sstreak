import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const EMOJI_CHOICES = [
  "💻", "✍️", "🏃", "📚", "🧘", "🎨", "🎸", "🥗",
  "💧", "😴", "🧪", "🚀", "🧠", "📷", "🌱", "🔥",
];

type Props = {
  onCreate: (h: { name: string; emoji: string }) => void;
  trigger?: React.ReactNode;
};

export function AddHabitDialog({ onCreate, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("💻");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim(), emoji });
    setName("");
    setEmoji("💻");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-flame text-flame-foreground hover:bg-flame/90 rounded-full">
            <Plus className="mr-1 h-4 w-4" /> New habit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Add a habit</DialogTitle>
          <DialogDescription>
            Give it a name and pick an emoji. You can change these later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name">Name</Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ship code"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label>Emoji</Label>
            <div className="grid grid-cols-8 gap-1.5">
              {EMOJI_CHOICES.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md text-xl transition-all",
                    emoji === e
                      ? "bg-flame/15 ring-2 ring-flame scale-105"
                      : "bg-muted hover:bg-accent",
                  )}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-flame text-flame-foreground hover:bg-flame/90"
            >
              Create habit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
