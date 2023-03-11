import React, { useState } from 'react'

export default function ({ children, description, variant = "topUpToRight" }: { children: React.ReactNode | undefined, description: string, variant?: IVariations }) {
  const [timeout, setModalTimeout] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        timeout && !showModal && clearTimeout(timeout);
        setModalTimeout(setTimeout(() => setShowModal(true), 1000))
      }}
      onMouseLeave={() => {
        timeout && clearTimeout(timeout)
        setShowModal(false);
      }}
      role="button"
      className='relative'
    >
      {
        showModal && <div className={'absolute whitespace-nowrap p-2 text-xs text-black rounded-md bg-slate-400 ' + variation.get(variant)}>
          {description}
        </div>
      }
      {children}
    </div>
  );
}

type IVariations = "topUpToRight"

const variation = new Map();
variation.set("topUpToRight", "top-0 right-0 -translate-y-full")