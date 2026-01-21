import type { setUserInputProps, Status, userInputProps } from "@/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const statuses: Status[] = [
  {
    value: "date",
    label: "Date",
  },
  {
    value: "name",
    label: "Name",
  },
];

const initialStatus: Status = {
  label: "Date",
  value: "date",
};

export default function ComboBoxResponsive({
  userInput,
  setUserInput,
  title,
}: {
  userInput: userInputProps;
  setUserInput: setUserInputProps;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(initialStatus);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-[150px] justify-start search-y-sort !shadow-half">
            {selectedStatus ? (
              <div className="flex w-full items-center justify-between">
                {selectedStatus.label}
                <p className={`sort-icon-parent transition-transform ${open && "rotate-180"}`}>🞃</p>
              </div>
            ) : (
              <>Select sort method</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 border-[1px] border-inv-sys/8" align="center">
          <StatusList
            userInput={userInput}
            setUserInput={setUserInput}
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
          />
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-[150px] justify-start search-y-sort !shadow-half">
          {selectedStatus ? (
            <div className="flex w-full items-center justify-between">
              {selectedStatus.label}
              <p className={`sort-icon-parent transition-transform ${open && "rotate-180"}`}>🞃</p>
            </div>
          ) : (
            <>Select sort method</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="cursor-n-resize">
        <img
          src="/dragHandle.svg"
          alt="Drag Handle"
          className="absolute top-0.5 left-1/2 translate-x-[-50%] pointer-events-none select-none opacity-75 dark:opacity-100"
          draggable={false}
        />
        <DrawerHeader className="py-0 cursor-default">
          <DrawerTitle className="w-fit jb-mono">{title}</DrawerTitle>
        </DrawerHeader>

        <div className="mt-4 border-t">
          <StatusList
            userInput={userInput}
            setUserInput={setUserInput}
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  userInput,
  setUserInput,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  userInput: userInputProps;
  setUserInput: setUserInputProps;
}) {
  return (
    <Command>
      {/* <CommandInput placeholder="Filter status..." /> */}
      <CommandList className="jb-mono">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map(status => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={value => {
                setSelectedStatus(statuses.find(priority => priority.value === value) || null);
                setUserInput({ ...userInput, sort: status.value });
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
