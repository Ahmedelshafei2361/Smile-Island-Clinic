'use client'

import { useState } from 'react'
import type { FAQ } from '@/lib/data'

const FAQ_COLORS = {
  cardClosed: 'bg-[rgba(241,228,217,0.4)]',
  cardOpen: 'bg-gradient-to-r from-[rgba(241,228,217,0.6)] to-[rgba(241,228,217,0.4)]',
  cardHover: 'hover:bg-[#F4EAE1]',

  questionIconBg: 'bg-white',
  questionIconText: 'text-[#9c673f]',

  toggleIcon: 'text-[#352514]',
  questionText: 'text-[#1a0200]',
  answerText: 'text-[#4d4d4d]',
}

function QuestionIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M9.4 9a2.6 2.6 0 1 1 3.7 2.4c-.9.5-1.6 1.1-1.6 2.3" />
      <circle cx="11.5" cy="17.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
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
      className={`size-[24px] shrink-0 text-[#352514] transition-transform duration-300 ease-out motion-reduce:transition-none ${
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

export default function FaqAccordion({ items, locale }: FaqAccordionProps) {
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
            <div className="flex items-start gap-[14px] lg:gap-[16px]">
              <span
                className={`grid size-[36px] shrink-0 place-items-center rounded-[8px] ${FAQ_COLORS.questionIconBg} ${FAQ_COLORS.questionIconText}`}
              >
                <QuestionIcon className="size-[20px]" />
              </span>

              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-[12px] py-[6px] text-start outline-none focus-visible:underline"
                >
                  <span
                    className={`font-[family-name:var(--font-body)] text-[16px] lg:text-[18px] font-medium leading-[1.4] transition-colors duration-300 ${FAQ_COLORS.questionText}`}
                  >
                    {question}
                  </span>

                  <span className="transition-transform duration-300 ease-out group-hover:scale-110">
                    <Toggle open={isOpen} />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? 'mt-[8px] grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`font-[family-name:var(--font-body)] text-[15px] lg:text-[16px] font-normal leading-[1.6] ${FAQ_COLORS.answerText}`}
                    >
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}