import bgimagesky from '../assets/images/Sky.jpg';
import bgblue from '../assets/images/blue.jpg';
import pen from '../assets/images/editpen.png';
import bgimage from '../assets/images/bg1.jpg';
import bgcity from '../assets/images/city.jpg';
import bgspace from '../assets/images/space.jpg';

// import { useState } from 'react';

import { Switch } from './ui/switch';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useRef } from 'react';
// import { Button } from './ui/button';

type SideSheetProps = {
  showStories?: boolean;
  setShowStories: (v: boolean) => void;
  showShorts: boolean;
  setShowShorts: (v: boolean) => void;
  rows: '1' | '2' | '3';
  setRows: (v: '1' | '2' | '3') => void;
  setBackground: (img: string) => void;
  background: string;
};

type Wallpaper = {
  label: string;
  value: string;
  preview?: string;
};

const wallpapers: Wallpaper[] = [
  { label: 'Abstract', value: bgimage, preview: bgimage },
  { label: 'Gradient', value: bgblue, preview: bgblue },
  { label: 'Photographs', value: bgimagesky, preview: bgimagesky },
  { label: 'Cityscapes', value: bgcity, preview: bgcity },
  { label: 'Space', value: bgspace, preview: bgspace },
];

function SideSheet({
  showStories,
  setShowStories,
  showShorts,
  setShowShorts,
  //   rows,
  //   setRows,
  setBackground,
  background,
}: SideSheetProps) {
  const customBg = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackground(imageUrl);
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <a className=" p-2 fixed z-10 right-10 bottom-5 bg-gray-600 hover:bg-gray-500 rounded-sm text-white">
            <img src={pen} alt="edit" />
          </a>
        </SheetTrigger>

        <SheetContent side="right" className=" w-110 bg-[#42414D] border-l-0">
          <SheetTitle className=" hidden"></SheetTitle>
          <SheetDescription></SheetDescription>
          <div className="h-90 text-white">
            {/* wallpaper */}
            <div className="pt-20 mr-0 cursor-default ">
              <div className="flex justify-between mx-10">
                <p>Wallpapers</p>
                <p
                  className="text-sm underline hover:no-underline cursor-pointer"
                  onClick={() => setBackground('')}
                >
                  Reset to default
                </p>
              </div>
              <div className="grid grid-cols-3 grid-rows-3 gap-y-10 p-4 text-[13px]">
                {wallpapers.map((wall) => (
                  <div
                    key={wall.label}
                    className="flex flex-col items-center gap-y-0.5"
                  >
                    {wall.preview ? (
                      <img
                        src={wall.preview}
                        onClick={() => setBackground(wall.value)}
                        alt={wall.label}
                        className={`w-26 h-20 rounded-md hover:brightness-75 cursor-pointer ${background === wall.value ? 'border-3 border-blue-400' : ''}`}
                      />
                    ) : (
                      <div
                        onClick={() => setBackground('')}
                        className={`w-26 h-20 bg-gray-600 rounded-md hover:brightness-75 cursor-pointer ${background === '' ? 'border-3 border-blue-400' : ''}`}
                      />
                    )}
                    <p>{wall.label}</p>
                  </div>
                ))}

                {/* Upload Section */}

                <div className="flex flex-col items-center gap-y-0.5">
                  <div className="w-26 h-20 flex justify-center hover:brightness-75 cursor-pointer items-center rounded-md border-2 border-dashed relative">
                    <input
                      type="file"
                      ref={customBg}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <img
                      className="w-26 h-20 rounded-md"
                      src={background}
                      alt=""
                    />
                    <span
                      className={`material-symbols-outlined absolute ${background ? 'hidden' : ''}`}
                    >
                      add
                    </span>
                  </div>
                  <p>Upload an Image</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="w-[90%] mx-[5%] border-gray-500" />
          {/* Toggles */}
          <div className="h-54 cursor-default text-white">
            <div className="pl-20 cursor-default pt-4">
              <Switch
                className="absolute left-7 cursor-pointer "
                id="shortcuts"
                checked={showShorts}
                onCheckedChange={setShowShorts}
              />
              <h2>Shortcuts</h2>
              <p className="text-[13px] text-gray-300">
                Sites you save or visit
              </p>
            </div>
            <div className="pl-20 pt-4">
              <Switch
                className="absolute left-7 cursor-pointer"
                id="stories"
                checked={showStories}
                onCheckedChange={setShowStories}
              />

              <h2>Recommended stories</h2>
              <p className="text-[13px] text-gray-300">
                Exceptional content curated by the Firefox family
              </p>
            </div>
          </div>
          <hr className="w-[90%] mx-[5%] relative bottom-10 border-gray-500" />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideSheet;
