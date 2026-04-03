import React from 'react'
import { SECTORS, SECTOR_KEYS } from '../utils/constants'

export default function SectorNav({ activeSector, onSelect, era, availableSectors }) {
  const eraColor = era === 'dotcom' ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' : 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={() => onSelect('all')}
        className={`px-3 py-2 rounded-lg font-mono text-[11px] border transition-all duration-200 ${
          activeSector === 'all'
            ? eraColor
            : 'border-[#1c2631] text-[#6b7280] hover:text-white hover:bg-[#111820]'
        }`}
      >
        <span className="mr-1.5">◈</span>All Sectors
      </button>

      {SECTOR_KEYS.filter(s => !availableSectors || availableSectors.includes(s)).map(sKey => {
        const sec = SECTORS[sKey]
        const isActive = activeSector === sKey
        return (
          <button
            key={sKey}
            onClick={() => onSelect(sKey)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[11px] border transition-all duration-200 ${
              isActive ? eraColor : 'border-[#1c2631] text-[#6b7280] hover:text-white hover:bg-[#111820]'
            }`}
          >
            <span style={{ color: isActive ? undefined : sec.color }}>{sec.icon}</span>
            <span>{sec.label}</span>
          </button>
        )
      })}
    </div>
  )
}
