import React, { useRef, useState } from "react";
import { motion } from "motion/react";

export const SlideTabsExample = () => {
  return (
    <div className="bg-neutral-100 py-20 w-full min-h-screen">
      <SlideTabs />
    </div>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: (position: any) => void;
  href?: string;
}

interface CursorProps {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>Pricing</Tab>
      <Tab setPosition={setPosition}>Features</Tab>
      <Tab setPosition={setPosition}>Docs</Tab>
      <Tab setPosition={setPosition}>Blog</Tab>

      <Cursor position={position} />
    </ul>
  );
};

export const NavigationSlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative flex w-fit"
    >
      <NavigationTab setPosition={setPosition} href="#services">Services</NavigationTab>
      <NavigationTab setPosition={setPosition} href="#proof-transformation">Proof</NavigationTab>
      <NavigationTab setPosition={setPosition} href="#faq">FAQ</NavigationTab>

      <NavigationCursor position={position} />
    </ul>
  );
};

const Tab: React.FC<TabProps> = ({ children, setPosition }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const NavigationTab: React.FC<TabProps> = ({ children, setPosition, href }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10"
    >
      <a
        href={href}
        className="block cursor-pointer px-5 py-2 text-white hover:text-blue-400 transition-colors"
      >
        {children}
      </a>
    </li>
  );
};

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

const NavigationCursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-8 rounded-lg bg-blue-600/20"
    />
  );
};