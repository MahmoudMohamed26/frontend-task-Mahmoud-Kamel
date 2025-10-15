export default function Header({text}: {text: string}) {
  return(
    <h1 className="text-black text-[26px] font-semibold mb-5">{text}</h1>
  )
}