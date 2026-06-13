'use client'

import { useState } from 'react'
import type { FAQ } from '@/lib/data'

const FAQ_COLORS = {
  cardClosed: 'bg-[rgba(241,228,217,0.4)]',
  cardOpen:
    'bg-gradient-to-r from-[rgba(241,228,217,0.6)] to-[rgba(241,228,217,0.4)]',
  cardHover: 'hover:bg-[#F4EAE1]',

  toggleIcon: 'text-[#352514]',
  questionText: 'text-[#1a0200]',
  answerText: 'text-[#4d4d4d]',
}

function Toggle({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      aria-hidden="true"
      className={`size-[24px] shrink-0 ${FAQ_COLORS.toggleIcon} transition-transform duration-300 ease-out motion-reduce:transition-none ${
        open ? 'rotate-45' : 'rotate-0'
      }`}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="12" y1="5" x2="12" y2="19" />
    </svg>
  )
}

interface FaqAccordionProps {
  items: FAQ[]
  locale: 'en' | 'ar'
}

export default function FaqAccordion({
  items,
  locale,
}: FaqAccordionProps) {
  const isAr = locale === 'ar'
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="flex w-full flex-col gap-[12px]">
      {items.map((item) => {
        const isOpen = openId === item.id
        const question = isAr ? item.questionAr : item.questionEn
        const answer = isAr ? item.answerAr : item.answerEn

        return (
          <div
            key={item.id}
            className={`rounded-[16px] px-[20px] py-[20px] transition-all duration-300 ease-out ${
              isOpen ? FAQ_COLORS.cardOpen : FAQ_COLORS.cardClosed
            } ${FAQ_COLORS.cardHover}`}
          >
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-[12px] py-[6px] text-start outline-none focus-visible:underline"
              >
                <span
                  className={`font-[family-name:var(--font-body)] text-[16px] font-medium leading-[1.4] transition-colors duration-300 lg:text-[18px] ${FAQ_COLORS.questionText}`}
                >
                  {question}
                </span>

                <span className="transition-transform duration-300 ease-out group-hover:scale-110">
                  <Toggle open={isOpen} />
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                  isOpen
                    ? 'mt-[8px] grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`font-[family-name:var(--font-body)] text-[15px] font-normal leading-[1.6] lg:text-[16px] ${FAQ_COLORS.answerText}`}
                  >
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}