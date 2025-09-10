import { useState } from 'react'
import type React from 'react'
import { useAccount, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { motion, AnimatePresence } from 'framer-motion'

export function Tip() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('0.01')
  const tipAddress = import.meta.env.VITE_TIP_ADDRESS as string | undefined
  const { isConnected } = useAccount()
  const { sendTransaction, isPending } = useSendTransaction()

  const canTip = isConnected && tipAddress

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-lg glass text-sm hover:bg-white/10">
        Tip
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative glass rounded-2xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold">Send a tip</h3>
              <p className="text-sm text-gray-300 mt-1">Support the craft. Sends ETH to the configured address.</p>
              {!tipAddress && (
                <p className="mt-3 text-xs text-yellow-300">Set VITE_TIP_ADDRESS in .env to enable tipping.</p>
              )}
              <label className="block mt-4 text-sm">Amount (ETH)</label>
              <input className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)} />
              <div className="mt-5 flex justify-end gap-2">
                <button className="px-3 py-2 text-sm" onClick={() => setOpen(false)}>Close</button>
                <button disabled={!canTip || isPending} onClick={() => {
                  if (!tipAddress) return
                  sendTransaction({ to: tipAddress as `0x${string}`, value: parseEther(amount || '0.01') }, {
                    onSuccess: () => setOpen(false)
                  })
                }} className="px-4 py-2 rounded-lg bg-white text-[#0b1020] text-sm disabled:opacity-50">
                  {isPending ? 'Sending…' : (isConnected ? 'Send Tip' : 'Connect wallet')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
