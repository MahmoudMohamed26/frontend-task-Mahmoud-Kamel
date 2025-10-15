export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <>
      <div className="w-full bg-[#E6E7E7] mb-10 rounded-full mt-17 relative h-1">
        <div
          className={`absolute h-full bg-[var(--main-color)] rounded-full`}
          style={{ width: `${progress}%` }}
        >
          <span className="absolute end-0 translate-x-1/2 bottom-[-28px] text-sm text-[#080365]">{progress}%</span>
          <span className="absolute text-[#080365] border-3 p-[6px_5px_6px_5px] end-0 translate-x-1/2 top-[-55px] text-xs rounded-full before:absolute before:border-6 before:border-l-transparent before:border-t-[#C9C8C9] before:translate-x-1/2 before:border-r-transparent before:border-b-transparent before:border-t-6 before:bottom-[-20px]">You</span>
        </div>
      </div>
    </>
  )
}
